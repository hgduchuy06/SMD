from datetime import datetime
import logging

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.workitem import WorkItemModel
from infrastructure.models.user import UserModel
from infrastructure.models.role import RoleModel
from services.audit_service import record_audit
from services.event_service import emit_event


def process_overdue_and_escalate():
    """Scan for overdue work items, mark them, record audit, and create escalation events."""
    now = datetime.utcnow()
    db = SessionLocal()
    try:
        overdue = db.query(WorkItemModel).filter(WorkItemModel.dueAt != None).filter(WorkItemModel.dueAt < now).filter(WorkItemModel.status == 'PENDING').all()
        for wi in overdue:
            wi.status = 'OVERDUE'
            wi.updatedAt = datetime.utcnow()
            db.commit()
            # audit
            record_audit('WorkItem', wi.workItemID, 'marked_overdue', user_id=None, details={'dueAt': wi.dueAt.isoformat() if wi.dueAt else None})
            # emit escalation event
            emit_event('workitem.overdue', {'workItemID': wi.workItemID, 'versionID': wi.versionID})
            # attempt simple escalation: notify HODs in the same department if available
            try:
                # find HOD role id
                hod_role = db.query(RoleModel).filter(RoleModel.roleName.ilike('%HOD%')).first()
                if hod_role:
                    hods = db.query(UserModel).filter(UserModel.roleID == hod_role.roleID).all()
                    for h in hods:
                        emit_event('workitem.escalation', {'workItemID': wi.workItemID, 'to': h.userID})
            except Exception:
                logging.exception('Failed to emit escalation targets')
    finally:
        db.close()

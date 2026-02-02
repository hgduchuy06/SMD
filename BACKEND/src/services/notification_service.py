from datetime import datetime, timedelta
import json
import logging

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.notification import NotificationModel
from infrastructure.models.syllabusversion import SyllabusVersionModel
from infrastructure.models.syllabus import SyllabusModel
from infrastructure.models.user import UserModel
from infrastructure.models.role import RoleModel


def _recent_similar_exists(db, version_id: int, event_name: str, window_seconds: int) -> bool:
    cutoff = datetime.utcnow() - timedelta(seconds=window_seconds)
    q = db.query(NotificationModel).filter(NotificationModel.syllabusID == version_id)
    q = q.filter(NotificationModel.createdAt >= cutoff)
    for n in q:
        try:
            msg = json.loads(n.message)
            if msg.get("event") == event_name:
                return True
        except Exception:
            continue
    return False


def notify_ai_completion(task_id: int, window_seconds: int = 900):
    """Create notifications for Lecturer, HoD and AA when AI completes.

    Avoid spam by checking for similar events in `window_seconds`.
    """
    db = SessionLocal()
    try:
        # get task -> version (AIProcessLogModel referenced by tasks normally)
        # to avoid circular imports, we'll query notifications by reading existing notif payloads
        # instead, assume task_id maps to Notification persisted earlier with versionID
        # try to find a recent notification to dedupe
        # If no syllabus/version info available, abort quietly
        notif = db.query(NotificationModel).filter(NotificationModel.message.like(f'%"taskID": {task_id}%')).first()
        version_id = None
        if notif:
            try:
                payload = json.loads(notif.message)
                payload = payload.get("payload") or payload
                version_id = payload.get("versionID") or payload.get("versionId")
            except Exception:
                version_id = None

        if not version_id:
            return

        # dedupe
        if _recent_similar_exists(db, version_id, "ai.task.completed", window_seconds):
            logging.debug("Skipping notification due to recent similar event")
            return

        # find department via syllabus -> subject -> department
        sv = db.get(SyllabusVersionModel, version_id)
        if not sv:
            return
        s = db.get(SyllabusModel, sv.syllabusID) if sv.syllabusID else None
        dept_id = None
        if s and s.subjectID:
            try:
                from infrastructure.models.subject import SubjectModel
                subj = db.get(SubjectModel, s.subjectID)
                dept_id = getattr(subj, 'departmentID', None)
            except Exception:
                dept_id = None

        # identify role IDs for Lecturer, HoD, AA
        role_names = ['Lecturer', 'HoD', 'AA']
        roles = db.query(RoleModel).filter(RoleModel.roleName.in_(role_names)).all()
        role_ids = [r.roleID for r in roles]

        # build recipients query
        q = db.query(UserModel)
        if dept_id:
            q = q.filter(UserModel.departmentID == dept_id)
        if role_ids:
            q = q.filter(UserModel.roleID.in_(role_ids))

        recipients = q.all()

        # create notifications
        for u in recipients:
            try:
                message = json.dumps({"event": "ai.task.completed", "taskID": task_id, "versionID": version_id}, ensure_ascii=False)
                n = NotificationModel(userID=u.userID, syllabusID=sv.syllabusID if sv else None, message=message, isRead=0, createdAt=datetime.utcnow())
                db.add(n)
            except Exception:
                logging.exception("Failed to queue notification for user %s", getattr(u, 'userID', None))
        db.commit()
    finally:
        db.close()

from datetime import datetime
import logging

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.workitem import WorkItemModel
from infrastructure.models.user import UserModel
from services.event_service import emit_event


def create_workitem(version_id: int, reviewer_id: int, assigned_by: int, due_at: datetime) -> dict:
    db = SessionLocal()
    try:
        wi = WorkItemModel(
            versionID=version_id,
            reviewerID=reviewer_id,
            assignedBy=assigned_by,
            status='PENDING',
            dueAt=due_at,
            createdAt=datetime.utcnow(),
            updatedAt=datetime.utcnow()
        )
        db.add(wi)
        db.commit()
        db.refresh(wi)
        emit_event('workitem.created', {"workItemID": wi.workItemID, "versionID": version_id})
        return {"workItemID": wi.workItemID, "status": wi.status}
    finally:
        db.close()


def reassign_workitem(workitem_id: int, new_reviewer_id: int, reassigner_id: int) -> dict:
    db = SessionLocal()
    try:
        wi = db.get(WorkItemModel, workitem_id)
        if not wi:
            raise ValueError('WorkItem not found')
        wi.reviewerID = new_reviewer_id
        wi.assignedBy = reassigner_id
        wi.updatedAt = datetime.utcnow()
        db.commit()
        emit_event('workitem.reassigned', {"workItemID": workitem_id, "newReviewer": new_reviewer_id})
        return {"workItemID": wi.workItemID, "reviewerID": wi.reviewerID}
    finally:
        db.close()


def set_workitem_status(workitem_id: int, status: str) -> dict:
    db = SessionLocal()
    try:
        wi = db.get(WorkItemModel, workitem_id)
        if not wi:
            raise ValueError('WorkItem not found')
        wi.status = status
        wi.updatedAt = datetime.utcnow()
        db.commit()
        emit_event('workitem.status_changed', {"workItemID": workitem_id, "status": status})
        return {"workItemID": wi.workItemID, "status": wi.status}
    finally:
        db.close()


def list_workitems_for_user(user_id: int):
    db = SessionLocal()
    try:
        items = db.query(WorkItemModel).filter(WorkItemModel.reviewerID == user_id).all()
        return [{
            "workItemID": i.workItemID,
            "versionID": i.versionID,
            "status": i.status,
            "dueAt": i.dueAt.isoformat() if i.dueAt else None
        } for i in items]
    finally:
        db.close()

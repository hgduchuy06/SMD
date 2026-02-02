from datetime import datetime
import json
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.auditlog import AuditLogModel


def record_audit(entity_type: str, entity_id: int, action: str, user_id: int = None, details: dict = None):
    db = SessionLocal()
    try:
        a = AuditLogModel(
            entityType=entity_type,
            entityID=entity_id,
            action=action,
            userID=user_id,
            details=json.dumps(details or {}, ensure_ascii=False),
            createdAt=datetime.utcnow()
        )
        db.add(a)
        db.commit()
        return a.auditID
    finally:
        db.close()


def query_audits(entity_type: str = None, entity_id: int = None, limit: int = 100):
    db = SessionLocal()
    try:
        q = db.query(AuditLogModel)
        if entity_type:
            q = q.filter(AuditLogModel.entityType == entity_type)
        if entity_id is not None:
            q = q.filter(AuditLogModel.entityID == entity_id)
        rows = q.order_by(AuditLogModel.createdAt.desc()).limit(limit).all()
        return [{
            'auditID': r.auditID,
            'entityType': r.entityType,
            'entityID': r.entityID,
            'action': r.action,
            'userID': r.userID,
            'details': r.details,
            'createdAt': r.createdAt.isoformat() if r.createdAt else None
        } for r in rows]
    finally:
        db.close()

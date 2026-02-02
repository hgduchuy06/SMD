import json
import logging
from datetime import datetime

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.notification import NotificationModel

# Optional redis import
try:
    import redis
except Exception:
    redis = None


def emit_event(name: str, payload: dict):
    """Emit event to configured broker (best-effort) and persist a notification fallback.

    - Tries to publish to Redis (if `redis` package installed and broker reachable).
    - Always persists a `NotificationModel` record as a reliable fallback for downstream consumers.
    """
    logging.info(f"Emit event {name}: {payload}")

    if redis is not None:
        try:
            r = redis.from_url("redis://localhost:6379/0")
            r.publish(name, json.dumps(payload, ensure_ascii=False))
        except Exception:
            logging.debug("Redis publish unavailable or failed; continuing")
    else:
        logging.debug("redis library not installed; skipping publish")

    # persist as a notification fallback
    db = SessionLocal()
    try:
        notif = NotificationModel(
            userID=None,
            syllabusID=payload.get("versionID"),
            message=json.dumps({"event": name, "payload": payload}, ensure_ascii=False),
            createdAt=datetime.utcnow()
        )
        db.add(notif)
        db.commit()
    finally:
        db.close()


def emit_syllabus_action(action: str, syllabus_id: int = None, version_id: int = None, actor_id: int = None, extras: dict = None):
    """Convenience wrapper for syllabus lifecycle events.

    action: one of 'submitted', 'version_updated', 'approved', 'published'
    """
    payload = {
        "action": action,
        "syllabusID": syllabus_id,
        "versionID": version_id,
        "actorID": actor_id,
    }
    if extras:
        payload.update(extras)

    emit_event(f"syllabus.{action}", payload)

from typing import Optional
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.user import UserModel
from infrastructure.models.role import RoleModel
from flask import request, jsonify
from functools import wraps


def get_user_role(user_id: int) -> Optional[str]:
    db = SessionLocal()
    try:
        u = db.get(UserModel, user_id)
        if not u:
            return None
        r = db.get(RoleModel, u.roleID) if u.roleID else None
        return r.roleName if r else None
    finally:
        db.close()


def _extract_actor_id():
    # Prefer JSON actorID, fallback to header X-User-ID
    try:
        data = request.get_json(silent=True) or {}
        if 'actorID' in data:
            return int(data.get('actorID'))
    except Exception:
        pass
    header = request.headers.get('X-User-ID')
    if header:
        try:
            return int(header)
        except Exception:
            return None
    return None


def require_roles(*allowed_roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            actor = _extract_actor_id()
            if not actor:
                return jsonify({'error': 'actorID or X-User-ID header required'}), 401
            role = get_user_role(actor)
            if not role:
                return jsonify({'error': 'user or role not found'}), 403
            if role not in allowed_roles:
                return jsonify({'error': 'forbidden - insufficient role'},), 403
            # attach actor id to kwargs for use inside handler if needed
            kwargs['_actor_id'] = actor
            kwargs['_actor_role'] = role
            return fn(*args, **kwargs)
        return wrapper
    return decorator

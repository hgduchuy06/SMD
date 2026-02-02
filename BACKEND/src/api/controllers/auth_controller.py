import jwt
from flask import Blueprint, request, jsonify, current_app
from passlib.hash import bcrypt
from datetime import datetime, timedelta
from infrastructure.models.user import UserModel
from infrastructure.models.role import RoleModel
from infrastructure.databases.mssql import session


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login',methods=['POST'])
def login():
    data = request.get_json()

    user = session.query(UserModel).filter_by(email=data['email']).first()

    if not user or user.passwordHash != data['password']:
        return jsonify({'error': 'Invalid credentials'}), 401

    role = session.query(RoleModel).filter_by(roleID=user.roleID).first()

    payload = {
        "user_id": user.userID,
        "role": role.roleName,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        "token": token,
        "user": user.fullName,
        "role": role.roleName
    })
@auth_bp.route('/refresh', methods=['POST'])
def refresh_token():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'Missing token'}), 401

    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

        new_payload = {
            "user_id": decoded["user_id"],
            "role": decoded["role"],
            "exp": datetime.utcnow() + timedelta(hours=2)
        }

        new_token = jwt.encode(new_payload, current_app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({"token": new_token})

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
def get_current_user_id():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return None

    try:
        token = auth_header.replace("Bearer ", "")
        decoded = jwt.decode(
            token,
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )
        return decoded.get("user_id")
    except:
        return None
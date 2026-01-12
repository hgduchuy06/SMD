from flask import Blueprint, request, jsonify
from services.user_service import UserService
from infrastructure.repositories.user_repsitory import UserRepository
from api.schemas.user import UserRequestSchema, UserResponseSchema
from datetime import datetime
from infrastructure.databases.mssql import session

# Khởi tạo Blueprint cho User
bp = Blueprint('user', __name__, url_prefix='/users')

# Khởi tạo Service với UserRepository
user_service = UserService(UserRepository(session))

request_schema = UserRequestSchema()
response_schema = UserResponseSchema()

@bp.route('/', methods=['GET'])
def list_users():
    """
    Get all users
    ---
    get:
      summary: Get all users
      tags:
        - Users
      responses:
        200:
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserResponse'
    """
    users = user_service.list_users()
    return jsonify(response_schema.dump(users, many=True)), 200

@bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Get user by id
    ---
    get:
      summary: Get user by id
      parameters:
        - name: user_id
          in: path
          required: true
          schema:
            type: integer
          description: ID của người dùng cần lấy
      tags:
        - Users
      responses:
        200:
          description: object of user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        404:
          description: User not found
    """
    user = user_service.get_user(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(response_schema.dump(user)), 200


@bp.route('/', methods=['POST'])
def create_user():
    """
    Create a new user
    ---
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRequest'
      tags:
        - Users
      responses:
        201:
          description: User created successfully
    """
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    now = datetime.utcnow()
    # Các trường mapping theo UserModel
    user = user_service.create_user(
        fullName=data['fullName'],
        email=data['email'],
        passwordHash=data['passwordHash'],
        roleID=data.get('roleID'),
        departmentID=data.get('departmentID'),
        status=data.get('status'),
        createdAt=now
    )
    return jsonify(response_schema.dump(user)), 201  

@bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Update a user by id
    """
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
        
    user = user_service.update_user(
        user_id=user_id,
        fullName=data['fullName'],
        email=data['email'],
        status=data.get('status'),
        roleID=data.get('roleID'),
        departmentID=data.get('departmentID')
    )
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
        
    return jsonify(response_schema.dump(user)), 200

@bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    Delete a user by id
    """
    try:
        user_service.delete_user(user_id)
        return '', 204
    except ValueError as e:
        return jsonify({'message': str(e)}), 404
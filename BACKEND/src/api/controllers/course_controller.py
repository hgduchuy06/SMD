from flask import Blueprint, request, jsonify
from datetime import datetime

from services.todo_service import TodoService
from infrastructure.repositories.todo_repository import TodoRepository
from api.schemas.todo import TodoRequestSchema, TodoResponseSchema
from infrastructure.databases.base import db  # ✅ DB SESSION

bp = Blueprint('course', __name__, url_prefix='/courses')

# =====================
# DEPENDENCY INJECTION
# =====================
todo_repo = TodoRepository(db.session)
todo_service = TodoService(todo_repo)

request_schema = TodoRequestSchema()
response_schema = TodoResponseSchema()

# =====================
# GET ALL
# =====================
@bp.route('/', methods=['GET'])
def list_todos():
    todos = todo_service.list_todos()
    return jsonify(response_schema.dump(todos, many=True)), 200

# =====================
# GET BY ID
# =====================
@bp.route('/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = todo_service.get_todo(todo_id)
    if not todo:
        return jsonify({'message': 'Todo not found'}), 404
    return jsonify(response_schema.dump(todo)), 200

# =====================
# CREATE
# =====================
@bp.route('/', methods=['POST'])
def create_todo():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    now = datetime.utcnow()
    todo = todo_service.create_todo(
        title=data['title'],
        description=data['description'],
        status=data['status'],
        created_at=now,
        updated_at=now
    )
    return jsonify(response_schema.dump(todo)), 201

# =====================
# UPDATE
# =====================
@bp.route('/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    todo = todo_service.update_todo(
        todo_id=todo_id,
        title=data['title'],
        description=data['description'],
        status=data['status'],
        updated_at=datetime.utcnow()
    )
    return jsonify(response_schema.dump(todo)), 200

# =====================
# DELETE
# =====================
@bp.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo_service.delete_todo(todo_id)
    return '', 204

from flask import Blueprint, request, jsonify
from datetime import datetime

from services.todo_service import TodoService
from infrastructure.repositories.todo_repository import TodoRepository
from api.schemas.todo import TodoRequestSchema, TodoResponseSchema
from infrastructure.databases.base import db  # ✅ DB SESSION

bp = Blueprint('course', __name__, url_prefix='/courses')


todo_repo = TodoRepository(db.session)
todo_service = TodoService(todo_repo)

request_schema = TodoRequestSchema()
response_schema = TodoResponseSchema()


@bp.route('/', methods=['GET'])
def list_todos():
    """
        List todos
        ---
        get:
            summary: Retrieve list of todos
            tags:
                - Courses
            responses:
                200:
                    description: A list of todos
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    $ref: '#/components/schemas/Todo'
    """
    todos = todo_service.list_todos()
    return jsonify(response_schema.dump(todos, many=True)), 200

@bp.route('/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    """
        Get todo by ID
        ---
        get:
            summary: Retrieve a single todo by ID
            tags:
                - Courses
            parameters:
                - in: path
                    name: todo_id
                    schema:
                        type: integer
                    required: true
            responses:
                200:
                    description: Todo found
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Todo'
                404:
                    description: Todo not found
    """
    todo = todo_service.get_todo(todo_id)
    if not todo:
        return jsonify({'message': 'Todo not found'}), 404
    return jsonify(response_schema.dump(todo)), 200

@bp.route('/', methods=['POST'])
def create_todo():
    """
        Create todo
        ---
        post:
            summary: Create a new todo
            tags:
                - Courses
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/TodoRequest'
            responses:
                201:
                    description: Todo created
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Todo'
                400:
                    description: Validation error
        """
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

@bp.route('/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """
        Update todo
        ---
        put:
            summary: Update an existing todo
            tags:
                - Courses
            parameters:
                - in: path
                    name: todo_id
                    schema:
                        type: integer
                    required: true
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/TodoRequest'
            responses:
                200:
                    description: Todo updated
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Todo'
                400:
                    description: Validation error
        """
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


@bp.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """
        Delete todo
        ---
        delete:
            summary: Delete a todo by ID
            tags:
                - Courses
            parameters:
                - in: path
                    name: todo_id
                    schema:
                        type: integer
                    required: true
            responses:
                204:
                    description: Todo deleted
        """
    todo_service.delete_todo(todo_id)
    return '', 204

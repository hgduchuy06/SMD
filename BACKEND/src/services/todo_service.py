from domain.models.todo import Todo
from infrastructure.repositories.todo_repository import TodoRepository
from typing import List, Optional
from datetime import datetime

class TodoService:
    def __init__(self, repo: TodoRepository):
        self.repo = repo

    def create_todo(self, title, description, status, created_at, updated_at) -> Todo:
        todo = Todo(
            id=None,
            title=title,
            description=description,
            status=status,
            created_at=created_at,
            updated_at=updated_at
        )
        return self.repo.add(todo)

    def get_todo(self, todo_id: int) -> Optional[Todo]:
        return self.repo.get_by_id(todo_id)

    def list_todos(self) -> List[Todo]:
        return self.repo.list()

    def delete_todo(self, todo_id: int):
        self.repo.delete(todo_id)

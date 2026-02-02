from domain.models.todo import Todo
from infrastructure.models.todo import TodoModel
from typing import List, Optional

class TodoRepository:
    def __init__(self, session):
        self.session = session

    def add(self, todo: Todo) -> Todo:
        model = TodoModel(
            title=todo.title,
            description=todo.description,
            status=todo.status,
            createdAt=todo.created_at,
            updatedAt=todo.updated_at
        )
        self.session.add(model)
        self.session.commit()
        self.session.refresh(model)

        return self._to_domain(model)

    def get_by_id(self, todo_id: int) -> Optional[Todo]:
        model = self.session.query(TodoModel).filter_by(id=todo_id).first()
        return self._to_domain(model)

    def list(self) -> List[Todo]:
        models = self.session.query(TodoModel).all()
        return [self._to_domain(m) for m in models]

    def delete(self, todo_id: int):
        model = self.session.query(TodoModel).filter_by(id=todo_id).first()
        if model:
            self.session.delete(model)
            self.session.commit()

    def _to_domain(self, model: TodoModel) -> Optional[Todo]:
        if not model:
            return None
        return Todo(
            id=model.id,
            title=model.title,
            description=model.description,
            status=model.status,
            created_at=model.createdAt,
            updated_at=model.updatedAt
        )

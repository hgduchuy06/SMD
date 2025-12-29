from abc import ABC, abstractmethod
from typing import List, Optional
# Giả định bạn có một class User (Domain Model) trong domain/models/user.py
from domain.models.user import User 

class IUserRepository(ABC):
    @abstractmethod
    def add(self, user: User) -> User:
        pass

    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        pass

    @abstractmethod
    def list(self) -> List[User]:
        pass

    @abstractmethod
    def update(self, user: User) -> User:
        pass

    @abstractmethod
    def delete(self, user_id: int) -> None:
        pass
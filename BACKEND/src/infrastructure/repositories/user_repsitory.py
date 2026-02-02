from typing import List, Optional
from sqlalchemy.orm import Session

from domain.models.iuser_repository import IUserRepository
from domain.models.user import User
from infrastructure.models.user import UserModel


class UserRepository(IUserRepository):
    def __init__(self, session: Session):
        self.session = session

    # =====================
    # PRIVATE MAPPER
    # =====================
    def _to_domain(self, model: UserModel) -> Optional[User]:
        if not model:
            return None

        return User(
            id=model.userID,
            fullName=model.fullName,
            email=model.email,
            passwordHash=model.passwordHash,
            roleID=model.roleID,
            departmentID=model.departmentID,
            status=model.status,
            createdAt=model.createdAt
        )

    # =====================
    # CRUD METHODS
    # =====================
    def add(self, user: User) -> User:
        try:
            new_user = UserModel(
                fullName=user.fullName,
                email=user.email,
                passwordHash=user.passwordHash,
                roleID=user.roleID,
                departmentID=user.departmentID,
                status=user.status,
                createdAt=user.createdAt
            )

            self.session.add(new_user)
            self.session.commit()
            self.session.refresh(new_user)

            return self._to_domain(new_user)

        except Exception as e:
            self.session.rollback()
            raise e

    def get_by_id(self, user_id: int) -> Optional[User]:
        user_db = (
            self.session
            .query(UserModel)
            .filter(UserModel.userID == user_id)
            .first()
        )
        return self._to_domain(user_db)

    def get_by_email(self, email: str) -> Optional[User]:
        user_db = (
            self.session
            .query(UserModel)
            .filter(UserModel.email == email)
            .first()
        )
        return self._to_domain(user_db)

    def list(self) -> List[User]:
        users_db = self.session.query(UserModel).all()
        return [self._to_domain(u) for u in users_db]

    def update(self, user: User) -> User:
        try:
            user_db = (
                self.session
                .query(UserModel)
                .filter(UserModel.userID == user.id)
                .first()
            )

            if not user_db:
                raise ValueError("User not found")

            user_db.fullName = user.fullName
            user_db.email = user.email
            user_db.status = user.status
            user_db.roleID = user.roleID
            user_db.departmentID = user.departmentID

            self.session.commit()
            return self._to_domain(user_db)

        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, user_id: int) -> None:
        try:
            user_db = (
                self.session
                .query(UserModel)
                .filter(UserModel.userID == user_id)
                .first()
            )

            if not user_db:
                raise ValueError("User not found")

            self.session.delete(user_db)
            self.session.commit()

        except Exception as e:
            self.session.rollback()
            raise e

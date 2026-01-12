from domain.models.iuser_repository import IUserRepository
from domain.models.user import User
from infrastructure.models.user import UserModel # Sử dụng UserModel từ file user.py của bạn
from sqlalchemy.orm import Session
from typing import List, Optional

class UserRepository(IUserRepository):
    def __init__(self, session: Session):
        self.session = session

    def _to_domain(self, model: UserModel) -> Optional[User]:
        """Chuyển đổi từ Database Model sang Domain Model để trả về cho tầng Business"""
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

    def add(self, user: User) -> User:
        try:
            # Manual mapping từ Domain User sang UserModel
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
        # Sử dụng userID làm khóa chính như định nghĩa trong UserModel
        user_db = self.session.query(UserModel).filter(UserModel.userID == user_id).first()
        return self._to_domain(user_db)

    def list(self) -> List[User]:
        users_db = self.session.query(UserModel).all()
        return [self._to_domain(u) for u in users_db]

    def update(self, user: User) -> User:
        try:
            user_db = self.session.query(UserModel).filter(UserModel.userID == user.id).first()
            if not user_db:
                raise ValueError('User not found')
            
            # Cập nhật thông tin
            user_db.fullName = user.fullName
            user_db.email = user.email
            user_db.status = user.status
            # Thêm các trường khác cần thiết...

            self.session.commit()
            return self._to_domain(user_db)
        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, user_id: int) -> None:
        try:
            user_db = self.session.query(UserModel).filter(UserModel.userID == user_id).first()
            if user_db:
                self.session.delete(user_db)
                self.session.commit()
            else:
                raise ValueError('User not found')
        except Exception as e:
            self.session.rollback()
            raise e
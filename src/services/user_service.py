from domain.models.user import User # Giả định bạn đã đổi Todo thành User trong domain
from domain.models.iuser_repository import IUserRepository # Interface mới đã đổi tên
from typing import List, Optional

class UserService:
    def __init__(self, repository: IUserRepository):
        self.repository = repository

    def create_user(self, fullName: str, email: str, passwordHash: str, 
                    roleID: int, departmentID: int, status: str, createdAt) -> User:
        # Khởi tạo object User với id=None vì DB sẽ tự tăng (Auto-increment)
        user = User(
            id=None, 
            fullName=fullName, 
            email=email, 
            passwordHash=passwordHash, 
            roleID=roleID, 
            departmentID=departmentID, 
            status=status, 
            createdAt=createdAt
        )
        return self.repository.add(user)

    def get_user(self, user_id: int) -> Optional[User]:
        return self.repository.get_by_id(user_id)

    def list_users(self) -> List[User]:
        return self.repository.list()

    def update_user(self, user_id: int, fullName: str, email: str, 
                    status: str, roleID: int = None, departmentID: int = None) -> User:
        # Lấy thông tin user hiện tại để giữ lại các trường không update (như password, createdAt)
        current_user = self.repository.get_by_id(user_id)
        if not current_user:
            raise ValueError("User not found")

        user = User(
            id=user_id,
            fullName=fullName,
            email=email,
            passwordHash=current_user.passwordHash, # Giữ nguyên password cũ
            roleID=roleID if roleID else current_user.roleID,
            departmentID=departmentID if departmentID else current_user.departmentID,
            status=status,
            createdAt=current_user.createdAt
        )
        return self.repository.update(user)

    def delete_user(self, user_id: int) -> None:
        self.repository.delete(user_id)
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base


class UserModel(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    userID = Column(Integer, primary_key=True, index=True)
    fullName = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    passwordHash = Column(String(255), nullable=False)

    roleID = Column(Integer, ForeignKey('roles.roleID'), nullable=False)
    departmentID = Column(Integer, ForeignKey('departments.departmentID'), nullable=True)

    status = Column(String(50), nullable=True)
    createdAt = Column(DateTime, nullable=True)

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class UserModel(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    userID = Column(Integer, primary_key=True)
    fullName = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    passwordHash = Column(String(255), nullable=False)
    roleID = Column(Integer, ForeignKey('roles.roleID'))
    departmentID = Column(Integer, ForeignKey('departments.departmentID'))
    status = Column(String(50))
    createdAt = Column(DateTime)
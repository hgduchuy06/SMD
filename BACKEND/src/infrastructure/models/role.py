from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class RoleModel(Base):
    __tablename__ = 'roles'
    __table_args__ = {'extend_existing': True}
    roleID = Column(Integer, primary_key=True)
    roleName = Column(String(255), nullable=False)
    description = Column(Text)
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class DepartmentModel(Base):
    __tablename__ = 'departments'
    __table_args__ = {'extend_existing': True}
    departmentID = Column(Integer, primary_key=True)
    departmentName = Column(String(255), nullable=False)
    facultyName = Column(String(255))
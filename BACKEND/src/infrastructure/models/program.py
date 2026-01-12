from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class ProgramModel(Base):
    __tablename__ = 'programs'
    __table_args__ = {'extend_existing': True}
    programID = Column(Integer, primary_key=True)
    programName = Column(String(255), nullable=False)
    departmentID = Column(Integer, ForeignKey('departments.departmentID'))
    degreeLevel = Column(Integer)
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class SubjectModel(Base):
    __tablename__ = 'subjects'
    __table_args__ = {'extend_existing': True}
    subjectID = Column(Integer, primary_key=True)
    subjectCode = Column(String(255), unique=True)
    subjectName = Column(String(255))
    credit = Column(Integer)
    departmentID = Column(Integer, ForeignKey('departments.departmentID'))
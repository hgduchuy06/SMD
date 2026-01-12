from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class SyllabusModel(Base):
    __tablename__ = 'syllabuses'
    __table_args__ = {'extend_existing': True}
    syllabusID = Column(Integer, primary_key=True)
    academicYear = Column(String(255))
    createdBy = Column(Integer, ForeignKey('users.userID'))
    currentVersionID = Column(Integer)
    status = Column(String(50))
    createdAt = Column(DateTime)
    subjectID = Column(Integer, ForeignKey('subjects.subjectID'))
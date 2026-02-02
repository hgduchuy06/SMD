from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float, Text
from infrastructure.databases.base import Base

class AssessmentModel(Base):
    __tablename__ = 'assessments'
    __table_args__ = {'extend_existing': True}
    assessmentID = Column(Integer, primary_key=True)
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    assessmentType = Column(String(100))  # midterm, final, assignment, quiz
    title = Column(String(255))
    weightPercent = Column(Float)
    createdBy = Column(Integer, ForeignKey('users.userID'))
    createdAt = Column(DateTime)
    notes = Column(Text)

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.dialects.mysql import LONGTEXT
from infrastructure.databases.base import Base


class AIResultModel(Base):
    __tablename__ = 'ai_results'
    __table_args__ = {'extend_existing': True}
    resultID = Column(Integer, primary_key=True)
    aiTaskID = Column(Integer, ForeignKey('ai_process_logs.aiTaskID'))
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    resultType = Column(String(100))
    workflowState = Column(String(100))
    payload = Column(LONGTEXT)
    createdAt = Column(DateTime)

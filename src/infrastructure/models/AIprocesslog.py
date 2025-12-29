from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.dialects.mysql import LONGTEXT
from infrastructure.databases.base import Base

class AIProcessLogModel(Base):
    __tablename__ = 'ai_process_logs'
    __table_args__ = {'extend_existing': True}
    aiTaskID = Column(Integer, primary_key=True)
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    taskType = Column(String(255))
    status = Column(String(255))
    result = Column(LONGTEXT)
    createdAt = Column(DateTime)
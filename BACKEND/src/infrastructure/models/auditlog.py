from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Text
from infrastructure.databases.base import Base


class AuditLogModel(Base):
    __tablename__ = 'audit_logs'
    __table_args__ = {'extend_existing': True}
    auditID = Column(Integer, primary_key=True)
    entityType = Column(String(255))
    entityID = Column(Integer)
    action = Column(String(255))
    userID = Column(Integer, ForeignKey('users.userID'))
    details = Column(Text)
    createdAt = Column(DateTime)

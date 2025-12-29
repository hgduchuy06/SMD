from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class NotificationModel(Base):
    __tablename__ = 'notifications'
    __table_args__ = {'extend_existing': True}
    notificationID = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey('users.userID'))
    syllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    message = Column(Text)
    isRead = Column(Integer, default=0)
    createdAt = Column(DateTime)
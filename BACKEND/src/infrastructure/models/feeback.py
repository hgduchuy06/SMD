from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class FeedbackModel(Base):
    __tablename__ = 'feedbacks'
    __table_args__ = {'extend_existing': True}
    feedbackID = Column(Integer, primary_key=True)
    syllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    userID = Column(Integer, ForeignKey('users.userID'))
    content = Column(Text)
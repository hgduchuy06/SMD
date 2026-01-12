from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class SubscriptionModel(Base):
    __tablename__ = 'subscriptions'
    __table_args__ = {'extend_existing': True}
    subscriptionID = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey('users.userID'))
    syllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    createdAt = Column(DateTime)
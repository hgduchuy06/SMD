from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class ReviewWorkflowModel(Base):
    __tablename__ = 'review_workflows'
    __table_args__ = {'extend_existing': True}
    workflowID = Column(Integer, primary_key=True)
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    reviewerID = Column(Integer, ForeignKey('users.userID'))
    decision = Column(String(255))
    comment = Column(Text)
    reviewedAt = Column(DateTime)
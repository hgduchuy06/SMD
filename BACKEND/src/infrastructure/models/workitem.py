from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base


class WorkItemModel(Base):
    __tablename__ = 'work_items'
    __table_args__ = {'extend_existing': True}
    workItemID = Column(Integer, primary_key=True)
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    reviewerID = Column(Integer, ForeignKey('users.userID'))
    assignedBy = Column(Integer, ForeignKey('users.userID'))
    status = Column(String(50))  # Pending, Approved, Rejected, Overdue
    dueAt = Column(DateTime)
    createdAt = Column(DateTime)
    updatedAt = Column(DateTime)

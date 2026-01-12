from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from sqlalchemy.dialects.mysql import LONGTEXT
from infrastructure.databases.base import Base

class SyllabusVersionModel(Base):
    __tablename__ = 'syllabus_versions'
    __table_args__ = {'extend_existing': True}
    versionID = Column(Integer, primary_key=True)
    syllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    versionNumber = Column(Integer)
    content = Column(LONGTEXT)
    changeSummary = Column(Text)
    createdBy = Column(Integer, ForeignKey('users.userID'))
    createdAt = Column(DateTime)
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class CLOModel(Base):
    __tablename__ = 'clos'
    __table_args__ = {'extend_existing': True}
    cloID = Column(Integer, primary_key=True)
    versionID = Column(Integer, ForeignKey('syllabus_versions.versionID'))
    cloCode = Column(String(255))
    cloDescription = Column(Text)
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from infrastructure.databases.base import Base

class ModuleRelationshipModel(Base):
    __tablename__ = 'module_relationships'
    __table_args__ = {'extend_existing': True}
    relationID = Column(Integer, primary_key=True)
    syllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    relatedSyllabusID = Column(Integer, ForeignKey('syllabuses.syllabusID'))
    relationType = Column(String(255))
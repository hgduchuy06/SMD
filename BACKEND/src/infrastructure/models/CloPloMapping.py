from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class CloPloMappingModel(Base):
    __tablename__ = 'clo_plo_mappings'
    __table_args__ = {'extend_existing': True}
    mappingID = Column(Integer, primary_key=True)
    ploID = Column(Integer, ForeignKey('plos.ploID'))
    cloID = Column(Integer, ForeignKey('clos.cloID'))
    mappingLevel = Column(String(255))
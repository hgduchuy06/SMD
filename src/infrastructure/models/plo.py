from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Text
from infrastructure.databases.base import Base

class PLOModel(Base):
    __tablename__ = 'plos'
    __table_args__ = {'extend_existing': True}
    ploID = Column(Integer, primary_key=True)
    programID = Column(Integer, ForeignKey('programs.programID'))
    ploCode = Column(String(255))
    ploDescription = Column(Text)
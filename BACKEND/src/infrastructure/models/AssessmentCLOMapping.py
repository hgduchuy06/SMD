from sqlalchemy import Column, ForeignKey, Integer, String
from infrastructure.databases.base import Base

class AssessmentCLOMappingModel(Base):
    __tablename__ = 'assessment_clo_mappings'
    __table_args__ = {'extend_existing': True}
    mappingID = Column(Integer, primary_key=True)
    assessmentID = Column(Integer, ForeignKey('assessments.assessmentID'))
    cloID = Column(Integer, ForeignKey('clos.cloID'))
    weightPercent = Column(Integer)

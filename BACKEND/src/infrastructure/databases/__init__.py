from infrastructure.databases.mssql import init_mssql
from infrastructure.models import AIprocesslog,CloPloMapping,clo,deparment,mouldeRelationship,feeback,notification,plo,program,reviewWorkflow,role,user,subject,subscription,syllabus,syllabusversion
def init_db(app):
    init_mssql(app)
    
from infrastructure.databases.mssql import Base
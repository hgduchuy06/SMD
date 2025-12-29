from infrastructure.databases.mysql import init_mysql, create_tables
from infrastructure.models import role,user,CloPloMapping,clo,plo,program,feeback,mouldeRelationship,notification,reviewWorkflow,subject,subscription,syllabus,syllabusversion,AIprocesslog,deparment

def init_db():
    init_mysql()
    create_tables()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base import Base
from config import Config


engine = create_engine(
    Config.DATABASE_URI,
    echo=True,
    future=True
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def init_mysql():
    return engine

def create_tables():
    Base.metadata.create_all(bind=engine)


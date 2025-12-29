from src.infrastructure.databases.mysql import create_tables

# Import model để SQLAlchemy biết bảng
from src.infrastructure.models.todo_model import TodoModel

if __name__ == "__main__":
    create_tables()
    print("✅ Table TODOS created in MySQL")

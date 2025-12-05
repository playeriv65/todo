"""
Database module
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import delete, text

SQLALCHEMY_DATABASE_URL = "sqlite:///./backend/db_tables/todos.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def test_mode():
    """Enable test mode and initiate database
    """
    from backend.models import TodoEntry

    db = SessionLocal()

    delete_stmt = delete(TodoEntry)
    db.execute(delete_stmt)

    print("尝试重置 ID 计数器...")
    try:
        # ⚠️ 必须使用 db.execute(text(...)) 来执行原始 SQL
        # 使用 text() 确保 SQLAlchemy 正确处理原始语句
        db.execute(text("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'todos';"))

    except Exception:
        pass

    # 3. 提交删除和重置操作
    db.commit()
    print("数据清空和 ID 重置完成。")

    print("开始插入初始化数据...")

    initial_todos = [
        {"todoName": "实现后端删除功能", "ddl": "今天", "finished": True},
        {"todoName": "前端联调 - GET", "ddl": "今天", "finished": True},
        {"todoName": "前端联调 - POST", "ddl": "明天", "finished": False},
        {"todoName": "学习 CSS Flexbox 技巧", "ddl": "周末", "finished": False},
    ]

    for todo_data in initial_todos:
        todo = TodoEntry(**todo_data)
        db.add(todo)

    db.commit()
    print("初始化数据插入成功。")

    db.close()


def create_db_and_tables():
    """
    Docstring for create_db_and_tables
    
    Open database and initiate
    """
    Base.metadata.create_all(bind=engine)
    test_mode()

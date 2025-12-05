from sqlalchemy import Column, Integer, String, Boolean
from backend.database import Base

class TodoEntry(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    todoName = Column(String, index=True)
    ddl = Column(String, index=True)
    finished = Column(Boolean, default=False)

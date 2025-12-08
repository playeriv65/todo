from sqlalchemy import Column, Integer, String, Boolean, DateTime, Uuid
from backend.database import Base


class TodoEntry(Base):
    __tablename__ = "todos"

    id = Column(Uuid, primary_key=True, index=True, default=None)
    todoName = Column(String, index=True)
    ddl = Column(DateTime, index=True)
    finished = Column(Boolean, default=False)

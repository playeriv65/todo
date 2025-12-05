"""
Basic schemas for data
"""

from typing import Optional
from pydantic import BaseModel


class TodoCreate(BaseModel):
    """Class for receiving create data"""

    todoName: str
    ddl: str | None = None


class TodoUpdate(BaseModel):
    """Class for update"""

    todoName: Optional[str] = None
    ddl: Optional[str] = None
    finished: Optional[bool] = None


class TodoBase(BaseModel):
    """Class for a full todo data"""

    id: int
    todoName: str
    ddl: str | None = None
    finished: bool

    class Config:
        """For converting TodoEntry"""

        from_attributes = True

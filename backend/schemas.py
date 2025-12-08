"""
Basic schemas for data
"""

from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


class TodoCreate(BaseModel):
    """Class for receiving create data"""

    id: UUID
    todoName: str
    ddl: Optional[datetime] = None


class TodoUpdate(BaseModel):
    """Class for update"""

    todoName: Optional[str] = None
    ddl: Optional[datetime] = None
    finished: Optional[bool] = None


class TodoBase(BaseModel):
    """Class for a full todo data"""

    id: UUID
    todoName: str
    ddl: Optional[datetime] = None
    finished: bool

    class Config:
        """For converting TodoEntry"""

        from_attributes = True

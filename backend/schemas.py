from pydantic import BaseModel

class TodoCreate(BaseModel):
    todoName: str
    ddl: str | None = None
    
class TodoReturn(BaseModel):
    id: int
    todoName: str
    ddl: str | None = None
    finished: bool
    
    class Config:
        from_attributes = True
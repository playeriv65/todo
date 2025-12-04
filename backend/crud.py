from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.models import TodoEntry
from backend.schemas import TodoCreate, TodoReturn

def get_todo_by_id(todo_id: int, db: Session):
    todo = db.query(TodoEntry).filter(TodoEntry.id == todo_id).first()

    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    return todo

def get_todo_all(db: Session):
    todos = db.query(TodoEntry).all()
    return todos

def create_todo(todo: TodoCreate, db: Session):
    todo_db = TodoEntry(**todo.model_dump())

    db.add(todo_db)

    db.commit()
    db.refresh(todo_db)

    return todo_db

def delete_todo(todo_id: int, db: Session):
    todo = get_todo_by_id(todo_id=todo_id, db=db)

    db.delete(todo)
    db.commit()
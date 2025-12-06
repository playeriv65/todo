"""Implementing CRUD Operations"""

from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.models import TodoEntry
from backend.schemas import TodoCreate, TodoUpdate, TodoBase


def get_todo_by_id(todo_id: int, db: Session):
    todo_entry = db.query(TodoEntry).filter(TodoEntry.id == todo_id).first()

    if todo_entry is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    return todo_entry


def get_todo_all(db: Session):
    todos = db.query(TodoEntry).all()
    return todos


def create_todo(todo: TodoCreate, db: Session):
    todo_db = TodoEntry(**todo.model_dump())

    db.add(todo_db)

    db.commit()
    db.refresh(todo_db)

    return todo_db


def update_todo(todo_id: int, todo_update: TodoUpdate, db: Session):
    """Update todo assist function"""
    todo_entry = get_todo_by_id(todo_id=todo_id, db=db)

    update_data = todo_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(todo_entry, key, value)

    db.commit()
    db.refresh(todo_entry)

    return todo_entry


def delete_todo(todo_id: int, db: Session):
    todo = get_todo_by_id(todo_id=todo_id, db=db)

    db.delete(todo)
    db.commit()

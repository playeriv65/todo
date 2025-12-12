from fastapi import FastAPI, Depends, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from sqlalchemy.orm import Session

from pydantic import BaseModel
from uuid import UUID

from backend.models import TodoEntry
from backend.dependencies import get_db
from backend.schemas import *
from backend import database
from backend import crud

database.create_db_and_tables()
app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DbDependency = Annotated[Session, Depends(get_db)]


@app.get("/todos/", response_model=list[TodoBase])
def get_todo_all(db: DbDependency):
    todos = crud.get_todo_all(db=db)

    return todos


@app.get("/todos/{id}", response_model=TodoBase)
def get_todo_by_id(id: UUID, db: DbDependency):
    todo_entry = crud.get_todo_by_id(id=id, db=db)

    return todo_entry


@app.post("/todos/", response_model=TodoBase)
def create_todo(todo: TodoCreate, db: DbDependency):
    todo_entry = crud.create_todo(todo=todo, db=db)

    return todo_entry


@app.patch("/todos/{id}", response_model=TodoBase)
def update_todo(id: UUID, todo_update: TodoUpdate, db: DbDependency):
    todo_entry = crud.update_todo(id=id, todo_update=todo_update, db=db)

    return todo_entry


@app.delete("/todos/{id}")
def delete_todo(id: UUID, db: DbDependency):
    crud.delete_todo(id=id, db=db)

    return Response(status_code=204)

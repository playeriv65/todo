import { ArrowCounterClockwiseIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import * as DATETIME from "./datetime.js";

function TodoName({ name, setDraftName, setIsEditingName }) {
  return (
    <p className="todo-name" onClick={() => {
      setDraftName(name);
      setIsEditingName(true);
    }}>
      {name}
    </p>
  )
}

function TodoNameInput({ draftName, setDraftName, onUpdateTodo, id, setIsEditingName }) {
  const handleCancel = () => {
    setDraftName("");
    setIsEditingName(false);
  }

  return (
    <input autoFocus className="todo-name" value={draftName} onChange={(e) => setDraftName(e.target.value)}
      onBlur={() => {
        onUpdateTodo(id, { name: draftName });
        setIsEditingName(false);
      }}

      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        } else if (e.key === "Escape") {
          handleCancel();
        }
      }}
    />
  )
}

function TodoDdl({ ddl, setDraftDdl, setIsEditingDdl }) {
  return (
    <p className="todo-ddl-text" onClick={() => {
      setDraftDdl(DATETIME.toInputValue(ddl));
      setIsEditingDdl(true);
    }}>
      {DATETIME.toDisplay(ddl)}
    </p>
  );
}

function TodoDdlInput({ draftDdl, setDraftDdl, onUpdateTodo, id, setIsEditingDdl }) {
  const handleCancel = () => {
    setDraftDdl("");
    setIsEditingDdl(false);
  }

  return (
    <input autoFocus className="todo-ddl-div" type="datetime-local" value={draftDdl} onChange={(e) => setDraftDdl(e.target.value)}
      onBlur={() => {
        onUpdateTodo(id, { ddl: DATETIME.toApiValue(draftDdl) });
        setIsEditingDdl(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        } else if (e.key === "Escape") {
          handleCancel();
        } 
      }}
    />
  )
}

function TodoToggleButton({ id, finished, onToggleTodo }) {
  const toggleClass = finished ? "redo-button" : "check-button";
  const ToggleIcon = finished ? ArrowCounterClockwiseIcon : CheckIcon;
  return (
    <button className={`todo-toggle-button ${toggleClass}`} onClick={() => onToggleTodo(id)}>
      <ToggleIcon />
    </button>
  )
}

function TodoDeleteButton({ id, onDeleteTodo }) {
  return (
    <button className="todo-delete-button" onClick={() => onDeleteTodo(id)}>
      <TrashIcon />
    </button>
  )
}

function TodoButtonsDiv({ id, finished, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-buttons-div">
      <TodoToggleButton id={id} finished={finished} onToggleTodo={onToggleTodo} />
      <TodoDeleteButton id={id} onDeleteTodo={onDeleteTodo} />
    </div>
  )
}

export function TodoItem({ todo, onDeleteTodo, onToggleTodo, onUpdateTodo }) {
  const [draftName, setDraftName] = useState(todo.name);
  const [draftDdl, setDraftDdl] = useState(todo.ddl);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDdl, setIsEditingDdl] = useState(false);

  return (
    <div className="todo-div">
      {isEditingName
        ? <TodoNameInput draftName={draftName} setDraftName={setDraftName} onUpdateTodo={onUpdateTodo} id={todo.id} setIsEditingName={setIsEditingName} />
        : <TodoName name={todo.name} setDraftName={setDraftName} setIsEditingName={setIsEditingName} />
      }

      {isEditingDdl
        ? <TodoDdlInput draftDdl={draftDdl} setDraftDdl={setDraftDdl} onUpdateTodo={onUpdateTodo} id={todo.id} setIsEditingDdl={setIsEditingDdl} />
        : <TodoDdl ddl={todo.ddl} setDraftDdl={setDraftDdl} setIsEditingDdl={setIsEditingDdl} />
      }
      
      <TodoButtonsDiv id={todo.id} finished={todo.finished} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />
    </div>
  )
}
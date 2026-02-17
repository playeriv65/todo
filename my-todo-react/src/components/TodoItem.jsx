import { ArrowCounterClockwiseIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react";

function TodoName({ todoName }) {
  return <p className="todo-name editable">{todoName}</p>
}

function TodoDdl({ ddl }) {
  return <p className="todo-ddl-text">{ddl}</p>
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

function TodoButtonsDiv({id, finished, onToggleTodo, onDeleteTodo}) {
  return (
    <div className="todo-buttons-div">
      <TodoToggleButton id={id} finished={finished} onToggleTodo={onToggleTodo} />
      <TodoDeleteButton id={id} onDeleteTodo={onDeleteTodo}/>
    </div>
  )
}

export function TodoItem({ todo, onDeleteTodo, onToggleTodo }) {
  return (
    <div className="todo-div">
      <TodoName todoName={todo.todoName}/>
      <TodoDdl ddl={todo.ddl}/>
      <TodoButtonsDiv id={todo.id} finished={todo.finished} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo}/>
    </div>
  )
}
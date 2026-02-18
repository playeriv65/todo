import { TodoItem } from "./TodoItem";

export function TodoList({ todoList, onToggleTodo, onDeleteTodo, onUpdateTodo }) {
  return (
    <ul className="todo-board" id="todo-board">
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  )
}
import { TodoItem } from "./TodoItem";

export function TodoList({ todoList, onToggleTodo, onDeleteTodo}) {
  return (
    <ul className="todo-board" id="todo-board">
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  )
}
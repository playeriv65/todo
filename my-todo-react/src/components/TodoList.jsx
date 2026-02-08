import { TodoItem } from "./TodoItem";

export function TodoList({todoList}) {
    return (
        <ul className="todo-board" id="todo-board">
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
    )
}
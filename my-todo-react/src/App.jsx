import { useEffect, useState } from "react";

import "./styles/style.css";
import "./styles/todo-board.css";

import * as API from "./api/api.js"

import { TodoList } from "./components/Todolist.jsx";
import { AddModal } from "./components/AddModal.jsx";



function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    let alive = true;

    async function loadTodoList() {
      const localTodoList = await API.getTodoList();
      if (alive) setTodoList(localTodoList);

      const remoteTodoList = await API.syncTodoList();
      if (alive) setTodoList(remoteTodoList);
    }

    loadTodoList();
    return () => alive = false;
  }, []);

  async function onAddTodo(todoToAdd) {
    const newTodo = await API.createTodo(todoToAdd);
    setTodoList((prev) => [...prev, newTodo]);
  }

  async function onDeleteTodo(id) {
    await API.deleteTodo(id);
    setTodoList((prev) => prev.filter(t => t.id !== id));
  }

  async function onToggleTodo(id) {
    const toggledTodo = await API.toggleTodo(id, todoList.find(t => t.id === id).finished);
    setTodoList((prev) => prev.map(t => t.id === id ? toggledTodo : t));
  }


  return (
    <>
      <div className="todo-app-div">
        <TodoList
          todoList={todoList}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />

        <AddModal onAddTodo={onAddTodo} />
      </div>
    </>
  );
}

export default App;
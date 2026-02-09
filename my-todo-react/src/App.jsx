import { useEffect, useState } from "react";

import "./styles/style.css";
import "./styles/todo-board.css";

import * as API from "./api/api.js"

import { TodoList } from "./components/Todolist.jsx";
import { AddModal } from "./components/AddModal.jsx";



function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function loadTodoList() {
      const todoList = await API.getTodoList();
      setTodoList(todoList);
    }

    loadTodoList();
  }, []);

  async function onAddTodo(todoToAdd) {
    const newTodo = await API.createTodo(todoToAdd);
    setTodoList((prev) => [...prev, newTodo]);
  }

  return (
    <>
      <div className="todo-app-div">
        <TodoList todoList={todoList} />

        <AddModal onAddTodo={onAddTodo} />
      </div>
    </>
  );
}

export default App;
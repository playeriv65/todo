import "./styles/style.css";
import "./styles/todo-board.css";
import * as API from "./api/api.js"

import { useEffect, useState } from "react";

import { XIcon, ListPlusIcon } from "@phosphor-icons/react"

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function loadTodoList() {
      const todoList = await API.getTodoList();
      setTodoList(todoList);
    }

    loadTodoList();
  }, []);

  const [todoName, setTodoName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="todo-app-div">
        <ul className="todo-board" id="todo-board">
          {todoList.map((todo) => (
            <li key={todo.id}>{todo.todoName} {todo.ddl}</li>
          ))}
        </ul>

        <button id="add-button" onClick={() => {
          const newTodo = { id: Date.now(), name: todoName };
          setTodoList((prev) => [...prev, newTodo]);
          setTodoName("");
        }}>
          test add
        </button>

        <input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="todo name"
        />

        <p>input: {todoName}</p>

        <div id="add-modal" className="add-modal">
          <div id="add-bar-overlay" className={`add-bar-overlay ${isModalOpen ? "active" : ""}`}>
            <div id="add-bar" className="add-bar">
              <input
                className="name-input styled-input"
                placeholder="todo name"
                id="name-input"
              />

              <input
                className="ddl-input styled-input"
                type="datetime-local"
                placeholder="ddl"
                id="ddl-input"
              />

              <button type="button" className="add-button" id="add-button">
                Add
              </button>
            </div>
          </div>

          <button id="open-modal-button" className="open-modal-button" onClick={
            () => setIsModalOpen(v => !v)
          }>
            {isModalOpen ? <XIcon size={24} /> : <ListPlusIcon size={24} />}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

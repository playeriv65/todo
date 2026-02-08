import "./styles/style.css";
import "./styles/todo-board.css";
import * as API from "./api/api.js"
import { TodoList } from "./components/Todolist.jsx";

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
  const [ddl, setDdl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTodo = async () => {
    const createdTodo = await API.createTodo({
      todoName,
      ddl,
    });

    setTodoList((prev) => [...prev, createdTodo]);
    setTodoName("");
    setDdl("");
  }

  return (
    <>
      <div className="todo-app-div">
        <TodoList todoList={todoList} />

        <div id="add-modal" className="add-modal">
          <div id="add-bar-overlay" className={`add-bar-overlay ${isModalOpen ? "active" : ""}`}>
            <div id="add-bar" className="add-bar">
              <input
                className="name-input styled-input"
                placeholder="todo name"
                id="name-input"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
              />

              <input
                className="ddl-input styled-input"
                type="datetime-local"
                placeholder="ddl"
                id="ddl-input"
                value={ddl}
                onChange={(e) => setDdl(e.target.value)}
              />

              <button
                type="button"
                className="add-button"
                id="add-button"
                onClick={() => { handleAddTodo(); }}
              >
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
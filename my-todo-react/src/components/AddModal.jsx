import { useState } from "react";

import { ListPlusIcon, XIcon, } from "@phosphor-icons/react"

import * as DATETIME from "./datetime.js";

export function AddModal({ onAddTodo }) {
  const [todoName, setTodoName] = useState("");
  const [ddl, setDdl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTodo = async () => {
    const todoToAdd = {
      todoName,
      ddl: DATETIME.toApiValue(ddl),
    };

    await onAddTodo(todoToAdd);
    setTodoName("");
    setDdl("");
  }

  return (
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
  )
}
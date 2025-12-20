import "./styles/style.css";
import "./styles/todo-board.css";

import * as API from "./api/api.js";
import * as DOM_UTIL from "./dom_util.js";

import { useState, useEffect } from "react";

function App() {


  return (
    <>
      <div className="todo-app-div">
        <div className="todo-board" id="todo-board"></div>

        <div id="add-modal" className="add-modal">
          <div id="add-bar-overlay" className="add-bar-overlay">
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

          <button id="open-modal-button" className="open-modal-button">
            <i
              id="open-modal-button-icon"
              className="open-modal-button-icon ph"
            ></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

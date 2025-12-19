import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="todo-app-div">

        <div class="todo-board" id="todo-board">

        </div>

          <div id="add-modal" class="add-modal">

              <div id="add-bar-overlay" class="add-bar-overlay">

                  <div id="add-bar" class="add-bar">

                      <input class="name-input styled-input" placeholder="todo name" id="name-input"></input>

                      <input class="ddl-input styled-input" type="datetime-local" placeholder="ddl" id='ddl-input'></input>

                      <button type="button" class="add-button" id="add-button">Add</button>

                  </div>

              </div>

              <button id="open-modal-button" class="open-modal-button">
                  <i id="open-modal-button-icon" class="open-modal-button-icon ph"></i>
              </button>

          </div>

          <script type="module" src="./app.js"></script>
      
      </div>
    </>
  )
}

export default App

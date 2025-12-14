import * as API from "./api/api.js";
import * as DOM_UTIL from "./dom_util.js";

const addBarOverlay = document.getElementById("add-bar-overlay");
const todoNameInput = document.getElementById("name-input");
const ddlInput = document.getElementById("ddl-input");
const addButton = document.getElementById("add-button");
const openModalButton = document.getElementById("open-modal-button");
let modalIsOpen = false;

const todoBoard = document.getElementById("todo-board");

const renderTodoList = (todoList) => {
  todoBoard.innerHTML = "";
  todoList.forEach((todo) => {
    todoBoard.appendChild(DOM_UTIL.getTodoDiv(todo));
  });
  console.log("render");
};

/**
 * Init page with callback operation
 */
async function initTodoListPage() {
  const localTodoList = await API.getTodoList((remoteTodoList) =>
    renderTodoList(remoteTodoList)
  );
  renderTodoList(localTodoList);
}

/**
 * Render page without callback
 */
async function refreshTodoListPage() {
  const localTodoList = await API.getTodoList();
  renderTodoList(localTodoList);
}

const clearInput = () => {
  todoNameInput.value = "";
  ddlInput.value = "";
};

addButton.addEventListener("click", async () => {
  const todoName = todoNameInput.value;
  const ddl = ddlInput.value;

  if (todoName == "") {
    // alert("Must have a name!");
    return;
  }

  await API.createTodo({ todoName, ddl });

  refreshTodoListPage();
  clearInput();
});

openModalButton.addEventListener("click", () => {
  addBarOverlay.classList.toggle("active");

  const openModalButtonIcon = document.getElementById("open-modal-button-icon");

  openModalButtonIcon.classList.toggle("ph-list-plus", modalIsOpen);
  openModalButtonIcon.classList.toggle("ph-x", !modalIsOpen);

  modalIsOpen = !modalIsOpen;
});

todoBoard.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  const todoDeleteButton = clickedElement.closest(".todo-delete-button");
  const todoToggleButton = clickedElement.closest(".todo-toggle-button");

  if (todoDeleteButton) {
    const id = todoDeleteButton.dataset.id;
    await API.deleteTodo(id);
    refreshTodoListPage();
  } else if (todoToggleButton) {
    const id = todoToggleButton.dataset.id;
    const todoFinished = todoToggleButton.dataset.finished === "true";

    const updatedTodo = await API.toggleTodo(id, todoFinished);
    const updatedTodoDiv = DOM_UTIL.getTodoDiv(updatedTodo);
    todoToggleButton.closest(".todo-div").replaceWith(updatedTodoDiv);
  } else if (
    clickedElement.classList.contains("todo-name") ||
    clickedElement.classList.contains("todo-ddl-text")
  ) {
    clickedElement.contentEditable = true;
  }
});

todoBoard.addEventListener("focusout", async (event) => {
  const outElement = event.target;

  if (outElement.classList.contains("editable")) {
    const updatedTodo = await API.updateTodo(outElement.dataset.id, {
      [outElement.dataset.varName]: outElement.textContent,
    });

    const updatedTodoDiv = DOM_UTIL.getTodoDiv(updatedTodo);
    outElement.closest(".todo-div").replaceWith(updatedTodoDiv);
  }
});

todoBoard.addEventListener("keydown", (event) => {
  if (event.target.classList.contains("editable") && event.key === "Enter") {
    event.target.blur();
  }
});

initTodoListPage();

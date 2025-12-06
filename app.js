import * as API from "./api.js";
import * as DOM_UTIL from "./dom_util.js";

const todoNameInput = document.getElementById("name-input");
const ddlInput = document.getElementById("ddl-input");
const addButton = document.getElementById("add-button");
const todoBoard = document.getElementById("todo-board");

const renderTodoList = async () => {
  const todoList = await API.getAllTodo();

  todoBoard.innerHTML = "";
  todoList.forEach((todo) => {
    todoBoard.appendChild(DOM_UTIL.getTodoDiv(todo));
  });
  console.log("render");
};

const clearInput = () => {
  todoNameInput.value = "";
  ddlInput.value = "";
};

addButton.addEventListener("click", async () => {
  const todoName = todoNameInput.value;
  const ddl = ddlInput.value;

  if (todoName == "") {
    alert("Must have a name!");
    return;
  }

  await API.createTodo({ todoName, ddl });

  renderTodoList();
  clearInput();
});

todoBoard.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  const todoDeleteButton = clickedElement.closest(".todo-delete-button");
  const todoToggleButton = clickedElement.closest(".todo-toggle-button");
  const todoDdlDiv = clickedElement.closest(".todo-ddl-div");

  if (todoDeleteButton) {
    const todoId = Number(todoDeleteButton.dataset.id);
    await API.deleteTodo(todoId);
    renderTodoList();
  } else if (todoToggleButton) {
    const todoId = Number(todoToggleButton.dataset.id);
    const todoFinished = todoToggleButton.dataset.finished === "true";

    const updatedTodo = await API.toggleTodo(todoId, todoFinished);
    const updatedTodoDiv = DOM_UTIL.getTodoDiv(updatedTodo);
    todoToggleButton.closest(".todo-div").replaceWith(updatedTodoDiv);
  } else if (clickedElement.classList.contains("todo-name")) {
    clickedElement.contentEditable = true;
  } else if (todoDdlDiv) {

    const todoDdlText = todoDdlDiv.querySelector(".todo-ddl-text");
    const todoDdlInput = todoDdlDiv.querySelector(".todo-ddl-input");

    todoDdlText.style.display = "none";
    todoDdlText.style.display = "block";
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

renderTodoList();

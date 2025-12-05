import * as API from "./api.js";
import * as DOM_UTIL from "./dom_util.js";

const todoNameInput = document.getElementById("name-input");
const ddlInput = document.getElementById("ddl-input");
const addButton = document.getElementById("add-button");
const todoBoard = document.getElementById("todo-board");

const addTodo = async (todoName, ddl) => {
  const todoCreate = {
    todoName,
    ddl,
  };

  const todo = await API.createTodo(todoCreate);
  addTodoToBoard(todo);
};

const deleteTodo = async (todo_id) => {
  await API.deleteTodo(todo_id);
  renderTodoList();
};

const renderTodoList = async () => {
  const todoList = await API.getAllTodo();

  todoBoard.innerHTML = "";
  todoList.forEach((todo) => {
    addTodoToBoard(todo);
  });
  console.log("render");
};

const addTodoToBoard = (todo) => {
  todoBoard.appendChild(DOM_UTIL.getTodoDiv(todo));
};

const clearInput = () => {
  todoNameInput.value = "";
  ddlInput.value = "";
};

addButton.addEventListener("click", (event) => {
  const todoName = todoNameInput.value;
  const ddl = ddlInput.value;
  const finished = false;

  if (todoName == "") {
    alert("Must have a name!");
    return;
  }

  addTodo(todoName, ddl, finished);
  clearInput();
});

todoBoard.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("delete-button")) {
    const todoId = Number(clickedElement.dataset.id);
    deleteTodo(todoId);
    renderTodoList();
  } else if (clickedElement.classList.contains("editable")) {
    clickedElement.contentEditable = true;
  }
});

todoBoard.addEventListener("focusout", async (event) => {
  const outElement = event.target;

  if (outElement.classList.contains("editable")) {
    const updatedTodo = await API.updateTodo(outElement.dataset.id, {
      [outElement.dataset.varName]: outElement.textContent,
    });

    const updatedTodoDiv = DOM_UTIL.getTodoDiv(updatedTodo)
    outElement.closest(".todo-div").replaceWith(updatedTodoDiv);
  }
});

todoBoard.addEventListener("keydown", (event) => {
  if (event.target.classList.contains("editable") && event.key === "Enter") {
    event.target.blur();
  }
});

renderTodoList();

import "./node_modules/@phosphor-icons/web/src/index.js";

const ICON_CLASS_NAMES = {
  check: "ph ph-check",
  redo: "ph ph-arrow-counter-clockwise",
  delete: "ph ph-trash",
  edit: "ph ph-pen",
};

export function getTodoNameElement(todoName, todoId) {
  const todoNameElement = document.createElement("p");

  todoNameElement.textContent = `${todoName}`;
  todoNameElement.className = "todo-name editable";
  todoNameElement.dataset.id = todoId;
  todoNameElement.dataset.varName = "todoName";

  return todoNameElement;
}

function getTodoDdlInput(ddl, todoId) {
  const todoDdlInput = document.createElement("input");

  todoDdlInput.className = "todo-ddl-input";
  todoDdlInput.dataset.id = todoId;
  todoDdlInput.value = ddl;

  todoDdlInput.type = "datetime-local";

  return todoDdlInput;
}

function getTodoDdlText(ddl, todoId) {
  const todoDdlText = document.createElement("p");

  todoDdlText.textContent = `${ddl}`;
  todoDdlText.className = "todo-ddl-text editable";
  todoDdlText.dataset.id = todoId;
  todoDdlText.dataset.varName = "ddl";

  return todoDdlText;
}

export function getTodoDdlDiv(ddl, todoId) {
  const todoDdlDiv = document.createElement("div");

  todoDdlDiv.appendChild(getTodoDdlText(ddl, todoId));
  //todoDdlDiv.appendChild(getTodoDdlInput(ddl, todoId));
  return todoDdlDiv;
}

export function getTodoToggleButtonIcon(finished) {
  const todoButtonIcon = document.createElement("i");
  todoButtonIcon.className = finished
    ? ICON_CLASS_NAMES.redo
    : ICON_CLASS_NAMES.check;

  return todoButtonIcon;
}

export function getTodoToggleButtonElement(finished, todoId) {
  const todoToggleButton = document.createElement("button");
  const todoToggleButtonIcon = getTodoToggleButtonIcon(finished);

  todoToggleButton.className = finished ? "redo-button" : "check-button";
  todoToggleButton.classList.add("todo-toggle-button");
  todoToggleButton.dataset.id = todoId;
  todoToggleButton.dataset.finished = finished;

  todoToggleButton.appendChild(todoToggleButtonIcon);
  return todoToggleButton;
}

function getTodoDeleteButtonElement(todoId) {
  const todoDeleteButton = document.createElement("button");
  const todoDeleteButtonIcon = document.createElement("i");

  todoDeleteButtonIcon.className = ICON_CLASS_NAMES.delete;

  todoDeleteButton.className = "todo-delete-button";
  todoDeleteButton.dataset.id = todoId;

  todoDeleteButton.appendChild(todoDeleteButtonIcon);
  return todoDeleteButton;
}

export function getTodoButtonsDiv(finished, todoId) {
  const todoButtonsDiv = document.createElement("div");

  todoButtonsDiv.className = "todo-buttons-div";
  todoButtonsDiv.dataset.id = todoId;

  const todoToggleButton = getTodoToggleButtonElement(finished, todoId);
  const todoDeleteButton = getTodoDeleteButtonElement(todoId);

  todoButtonsDiv.appendChild(todoToggleButton);
  todoButtonsDiv.appendChild(todoDeleteButton);

  return todoButtonsDiv;
}

export function getTodoDiv(todo) {
  const todoDiv = document.createElement("div");

  todoDiv.className = "todo-div";
  todoDiv.dataset.id = todo.id;

  todoDiv.appendChild(getTodoNameElement(todo.todoName, todo.id));
  todoDiv.appendChild(getTodoDdlDiv(todo.ddl, todo.id));
  todoDiv.appendChild(getTodoButtonsDiv(todo.finished, todo.id));

  return todoDiv;
}

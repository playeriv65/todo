import "../node_modules/@phosphor-icons/web/src/index.js";

const ICON_CLASS_NAMES = {
  check: ["ph", "ph-check"],
  redo: ["ph", "ph-arrow-counter-clockwise"],
  delete: ["ph", "ph-trash"],
  edit: ["ph", "ph-pen"],
};

function createElementWithData(tagName, classList, dataset = {}) {
  const element = document.createElement(tagName);

  element.classList.add(...classList);
  Object.assign(element.dataset, dataset);

  return element;
}

export function getTodoNameElement(todoName, id) {
  const todoNameElement = createElementWithData(
    "p",
    ["todo-name", "editable"],
    { id: id, varName: "todoName" }
  );
  todoNameElement.textContent = `${todoName}`;

  return todoNameElement;
}

function getTodoDdlInput(ddl, id) {
  const todoDdlInput = createElementWithData("input", ["todo-ddl-input"], {
    id: id,
  });
  todoDdlInput.value = ddl;
  todoDdlInput.type = "datetime-local";

  return todoDdlInput;
}

function getTodoDdlText(ddl, id) {
  const todoDdlText = createElementWithData(
    "p",
    ["todo-ddl-text", "editable"],
    { id: id, varName: "ddl" }
  );
  todoDdlText.textContent = `${ddl}`;

  return todoDdlText;
}

export function getTodoDdlDiv(ddl, id) {
  const todoDdlDiv = createElementWithData("div", ["todo-ddl-div"]);

  todoDdlDiv.appendChild(getTodoDdlText(ddl, id));
  return todoDdlDiv;
}

export function getTodoToggleButtonIcon(finished) {
  const todoButtonIcon = createElementWithData(
    "i",
    finished ? ICON_CLASS_NAMES.redo : ICON_CLASS_NAMES.check
  );

  return todoButtonIcon;
}

export function getTodoToggleButtonElement(finished, id) {
  const todoToggleButton = createElementWithData(
    "button",
    finished
      ? ["redo-button", "todo-toggle-button"]
      : ["check-button", "todo-toggle-button"],
    { id: id, finished: finished }
  );

  todoToggleButton.appendChild(getTodoToggleButtonIcon(finished));
  return todoToggleButton;
}

function getTodoDeleteButtonElement(id) {
  const todoDeleteButton = createElementWithData(
    "button",
    ["todo-delete-button"],
    { id: id }
  );

  const todoDeleteButtonIcon = createElementWithData(
    "i",
    ICON_CLASS_NAMES.delete
  );
  todoDeleteButton.appendChild(todoDeleteButtonIcon);
  return todoDeleteButton;
}

export function getTodoButtonsDiv(finished, id) {
  const todoButtonsDiv = createElementWithData("div", ["todo-buttons-div"], {
    id: id,
  });

  todoButtonsDiv.appendChild(getTodoToggleButtonElement(finished, id));
  todoButtonsDiv.appendChild(getTodoDeleteButtonElement(id));

  return todoButtonsDiv;
}

export function getTodoDiv(todo) {
  const todoDiv = createElementWithData("div", ["todo-div"], { id: todo.id });

  todoDiv.appendChild(getTodoNameElement(todo.todoName, todo.id));
  todoDiv.appendChild(getTodoDdlDiv(todo.ddl, todo.id));
  todoDiv.appendChild(getTodoButtonsDiv(todo.finished, todo.id));

  return todoDiv;
}

export function getTodoNameElement(todoName, todoId) {
  const todoNameElement = document.createElement("p");

  todoNameElement.textContent = `${todoName}`;
  todoNameElement.className = "todo-name editable";
  todoNameElement.dataset.id = todoId;
  todoNameElement.dataset.varName = "todoName";

  return todoNameElement;
}

export function getTodoDdlElement(ddl, todoId) {
  const todoDdlElement = document.createElement("p");

  todoDdlElement.textContent = `${ddl}`;
  todoDdlElement.className = "todo-ddl editable";
  todoDdlElement.dataset.id = todoId;
  todoDdlElement.dataset.varName = "ddl";

  return todoDdlElement;
}

export function getTodoButtonElement(finished, todoId) {
  const todoButton = document.createElement("button");

  todoButton.textContent = finished ? "D" : "R";
  todoButton.className = finished ? "delete-button" : "restore-button";
  todoButton.dataset.id = todoId;

  return todoButton;
}

export function getTodoDiv(todo) {
  const todoDiv = document.createElement("div");

  todoDiv.className = "todo-div";
  todoDiv.dataset.id = todo.id;

  todoDiv.appendChild(getTodoNameElement(todo.todoName, todo.id));
  todoDiv.appendChild(getTodoDdlElement(todo.ddl, todo.id));
  todoDiv.appendChild(getTodoButtonElement(todo.finished, todo.id));

  return todoDiv;
}

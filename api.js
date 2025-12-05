const BaseApiUrl = "http://127.0.0.1:8000";

const JSON_HEADER = { "Content-Type": "application/json" };

async function apiCall(endPoint, config = {}) {
  try {
    const response = await fetch(BaseApiUrl + endPoint, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API error! Status: ${response.status}. Detail: ${errorData}`
      );
    }

    if (response.status === 204) {
      return { message: "OK" };
    }

    return response.json();
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
}

export async function getAllTodo() {
  const todoList = await apiCall("/todos/");

  return todoList;
}

export async function getTodoById(todoId) {
  const todo = await apiCall(`/todos/${todoId}`);

  return todo;
}

export async function createTodo(todoCreate) {
  const todo = await apiCall("/todos/", {
    method: "POST",
    headers: JSON_HEADER,
    body: JSON.stringify(todoCreate),
  });

  return todo;
}

export async function updateTodo(todoId, todoUpdate) {
  const todo = await apiCall(`/todos/${todoId}`, {
    method: "PATCH",
    headers: JSON_HEADER,
    body: JSON.stringify(todoUpdate),
  });

  return todo;
}

export async function deleteTodo(todoId) {
  const msg = await apiCall(`/todos/${todoId}`, {
    method: "DELETE",
  });

  return msg;
}

const BaseApiUrl = "http://127.0.0.1:8000";
const JSON_HEADER = { "Content-Type": "application/json" };

/**
 * Handle api call
 * @param {string} endPoint Api url end point.
 * @param {object} config Config and request body.
 * @returns 
 */
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

export async function getTodoList() {
  const todoListRemote = await apiCall("/todos/");
  return todoListRemote;
}

export async function getTodoById(id) {
  const todo = await apiCall(`/todos/${id}`);

  return todo;
}

export async function postTodo(todoPost) {
  const todo = await apiCall("/todos/", {
    method: "POST",
    headers: JSON_HEADER,
    body: JSON.stringify(todoPost),
  });

  return todo;
}

export async function updateTodo(id, todoUpdate) {
  const todo = await apiCall(`/todos/${id}`, {
    method: "PATCH",
    headers: JSON_HEADER,
    body: JSON.stringify(todoUpdate),
  });

  return todo;
}

export async function toggleTodo(id, todoFinished) {
  const todoUpdate = {
    finished: !todoFinished,
  };

  const todo = await updateTodo(id, todoUpdate);
  return todo;
}

export async function deleteTodo(id) {
  const msg = await apiCall(`/todos/${id}`, {
    method: "DELETE",
  });

  return msg;
}

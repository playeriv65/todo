const BaseApiUrl = 'http://127.0.0.1:8000'

async function apiCall(endPoint, config = {}) {
    try {
        const response = await fetch(BaseApiUrl + endPoint, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error! Status: ${response.status}. Detail: ${errorData}`);
        }

        if (response.status === 204) {
            return { message: 'OK' };
        }

        return response.json();
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}

export async function getAllTodo() {
    const todoList = await apiCall('/todos/');

    return todoList;
}

export async function getTodoById(todo_id) {
    const todo = await apiCall(`/todos/${todo_id}`);

    return todo;
}

export async function createTodo(todoCreate) {
    const todo = await apiCall('/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoCreate)
    })

    return todo;
}

export async function deleteTodo(todo_id) {
    const msg = await apiCall(`/todos/${todo_id}`, {
        method: 'DELETE',
    })

    return msg;
}
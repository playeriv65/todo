import * as API from './api.js';

const todoNameInput = document.getElementById('name-input');
const ddlInput = document.getElementById('ddl-input');
const addButton = document.getElementById('add-button');
const todoBoard = document.getElementById('todo-board');

const addTodo = async (todoName, ddl) => {
    const todoCreate = {
        todoName,
        ddl
    };

    const todo = await API.createTodo(todoCreate);
    addTodoToBoard(todo);
}

const deleteTodo = async (todo_id) => {
    await API.deleteTodo(todo_id);
    renderTodoList();
}

const getTodoDiv = (todo) => {
    const todoDiv = document.createElement('div');
    const todoInfo = document.createElement('p');
    const deleteButton = document.createElement('button');

    todoInfo.textContent = `todoname: ${todo.todoName} ddl:${todo.ddl} finished:${todo.finished}`;

    deleteButton.textContent = 'D';
    deleteButton.className = 'delete-button';
    deleteButton.dataset.id = todo.id;

    todoDiv.className = 'todo-div';
    todoDiv.appendChild(todoInfo);
    todoDiv.appendChild(deleteButton);

    return todoDiv;
}

const renderTodoList = async () => {
    const todoList = await API.getAllTodo();

    todoBoard.innerHTML = '';
    todoList.forEach((todo, index) => {
        addTodoToBoard(todo);
    });
    console.log('render')
}

const addTodoToBoard = (todo) => {
    todoBoard.appendChild(getTodoDiv(todo));
}

const clearInput = () => {
    todoNameInput.value = '';
    ddlInput.value = '';
}

addButton.addEventListener('click', (event) => {
    event.preventDefault();

    const todoName = todoNameInput.value;
    const ddl = ddlInput.value;
    const finished = false;

    if (todoName == '') {
        alert('Must have a name!');
        return;
    }

    addTodo(todoName, ddl, finished);
    clearInput();
});

todoBoard.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('delete-button')) {
        const todoId = Number(clickedElement.dataset.id);
        deleteTodo(todoId);
        renderTodoList();
    }
})

renderTodoList();
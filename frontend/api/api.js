import * as REMOTE from "./remote_api.js";
import * as LOCAL from "./local_api.js";
import * as SYNC from "./sync_manager.js";

async function todoListCallBack(callBack) {
  const remoteTodoList = await REMOTE.getTodoList();

  callBack(remoteTodoList);
}

export async function getTodoList(callBack = null) {
  const localTodoList = await LOCAL.getTodoList();
  if (callBack) {
    todoListCallBack(callBack);
  }

  return localTodoList;
}

export async function createTodo(todoCreate) {
  todoCreate.id = crypto.randomUUID();
  await LOCAL.putTodo(todoCreate);
  SYNC.addToSyncQueue("CREATE", todoCreate);

  return todoCreate;
}

export async function updateTodo(id, todoUpdate) {
  const updatedTodo = await LOCAL.updateTodo(id, todoUpdate);
  SYNC.addToSyncQueue("UPDATE", updatedTodo);

  return updatedTodo;
}

export async function toggleTodo(id, todoFinished) {
  return await updateTodo(id, { finished: !todoFinished });
}

export async function deleteTodo(id) {
  await LOCAL.deleteTodo(id);
  SYNC.addToSyncQueue("DELETE", { id: id });
}

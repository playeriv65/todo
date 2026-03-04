import * as LOCAL from "./local_api.js";
import * as SYNC from "./sync_manager.js";

export async function syncTodoList() {
  const remoteTodoList = SYNC.syncTodoList();
  return remoteTodoList || [];
}
export async function getTodoList() {
  const localTodoList = await LOCAL.getTodoList();

  return localTodoList || [];
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

import * as REMOTE from "./remote_api.js";
import * as LOCAL from "./local_api.js";
import * as SYNC from "./sync_manager.js";
import { uuidv7 } from "uuidv7";

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
  todoCreate.id = uuidv7();
  await LOCAL.putTodo(todoCreate);
  SYNC.addToSyncQueue("CREATE", todoCreate);

  return todoCreate;
}

export async function updateTodo(todoId, todoUpdate) {
  const updatedTodo = await LOCAL.updateTodo(todoId, todoUpdate);
  SYNC.addToSyncQueue("UPDATE", updatedTodo);

  return updatedTodo;
}

export async function deleteTodo(todoId) {
  await LOCAL.deleteTodo(todoId);
  SYNC.addToSyncQueue("DELETE", { id: todoId });
}

import * as REMOTE from "./remote_api.js";
import * as LOCAL from "./local_api.js";

async function syncFromServer(getData, writeData, callBack) {
  try {
    const data = await getData();

    if (!data) {
      throw new Error("No server data");
    }

    await writeData(data);

    if (callBack) {
      callBack(data);
    }
  } catch (error) {
    console.warn("Network error, using local data：", error.message || error);
  }
}

export async function getTodoList(callBack) {
  const localTodoList = await LOCAL.getTodoList();

  syncFromServer(REMOTE.getTodoList, LOCAL.updateTodoList, callBack);
  return localTodoList || [];
}

import * as LOCAL from "./local_api.js";
import * as REMOTE from "./remote_api.js";

let isSyncing = false;

/**
 * Process all transactions in sync queue, send them to backend.
 * @returns
 */
export async function processSyncQueue() {
  if (isSyncing) return;
  if (!navigator.onLine) return;
  isSyncing = true;

  try {
    const syncQueueItems = await LOCAL.getSyncQueueItems();

    for (const item of syncQueueItems) {
      try {
        const actions = {
          CREATE: () => REMOTE.postTodo(item.payload),
          UPDATE: () => REMOTE.updateTodo(item.payload.id, item.payload),
          DELETE: () => REMOTE.deleteTodo(item.payload.id),
        };

        await actions[item.type]?.();

        await LOCAL.deleteQueueItem(item.id);
      } catch (error) {
        console.error("One file failed to sync: ", error);
        break;
      }
    }
  } finally {
    isSyncing = false;
  }
}

export async function addToSyncQueue(type, payload) {
  await LOCAL.executeRequest(
    "readwrite",
    (store) => {
      store.put({ type, payload, createdAt: Date.now() });
    },
    "sync_queue"
  );

  processSyncQueue();
}

/**
 * Get newest todo list from server and write.
 */
export async function syncTodoList() {
  if (!navigator.onLine) return;

  await processSyncQueue();
  const todoList = await REMOTE.getTodoList();
  await LOCAL.updateTodoList(todoList);
}

window.addEventListener("online", async () => {
  console.log("Connect to network, start syncing...");
  await syncTodoList();
});

window.addEventListener("focus", async () => {
  await syncTodoList();
});

document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible") {
    await syncTodoList();
  }
});

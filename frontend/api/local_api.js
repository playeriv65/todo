const DB_NAME = "TodoAppDB";
const DB_VERSION = 1;
const TODO_TABLE_NAME = "todos";
const SYNC_QUEUE_TABLE_NAME = "sync_queue";

let dbInstance = null;

function getDb() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("Upgrading database...");

      if (!db.objectStoreNames.contains(TODO_TABLE_NAME)) {
        db.createObjectStore(TODO_TABLE_NAME, { keyPath: "id" });
      }

      // Events that are not synced
      if (!db.objectStoreNames.contains(SYNC_QUEUE_TABLE_NAME)) {
        db.createObjectStore(SYNC_QUEUE_TABLE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Failed to open db: " + event.target.error);
    };
  });
}

export async function executeRequest(
  mode,
  operation,
  storeName = TODO_TABLE_NAME
) {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    const request = operation(store);

    // handle single and batch process
    if (request) {
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    } else {
      tx.oncomplete = () => resolve();
      tx.onerror = (event) =>
        reject("Transaction Error: " + event.target.error);
    }
  });
}

export async function putTodo(todo) {
  return executeRequest("readwrite", (store) => store.put(todo));
}

export async function updateTodo(id, todoUpdate) {
  let updatedTodoResult = null;
  await executeRequest("readwrite", (store) => {
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const oldTodo = event.target.result;

      if (oldTodo) {
        const updatedTodo = { ...oldTodo, ...todoUpdate };
        updatedTodoResult = updatedTodo;
        store.put(updatedTodo);
      } else {
        console.warn("Local old todo not found!");
      }
    };
    // Return null to ensure we wait for transaction completion
    return null;
  });
  return updatedTodoResult;
}

export async function updateTodoList(todos) {
  return executeRequest("readwrite", (store) => {
    store.clear();
    todos.forEach((todo) => {
      store.put(todo);
    });
  });
}

export async function getTodoList() {
  return executeRequest("readonly", (store) => store.getAll());
}

export async function getTodoById(todoId) {
  return executeRequest("readonly", (store) => store.get(todoId));
}

export async function deleteTodo(todoId) {
  return executeRequest("readwrite", (store) => store.delete(todoId));
}

export async function deleteQueueItem(itemId) {
  return executeRequest(
    "readwrite",
    (store) => store.delete(itemId),
    SYNC_QUEUE_TABLE_NAME
  );
}

export async function getSyncQueueItems() {
  return executeRequest(
    "readonly",
    (store) => store.getAll(),
    SYNC_QUEUE_TABLE_NAME
  );
}

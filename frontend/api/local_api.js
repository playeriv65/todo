const DB_NAME = "TodoAppDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";

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

      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id" });
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

async function executeRequest(mode, operation) {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);

    const request = operation(store);

    // handle single and batch process
    if (request) {
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    } else {
      tx.oncomplete = () => resolve();
      tx.onerror = (event) => reject("Transaction Error: " + event.target.error);
    }
  });
}

export async function putTodo(todo) {
  return executeRequest("readwrite", (store) => store.put(todo));
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

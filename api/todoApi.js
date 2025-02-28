const todoAPI = (() => {
    const BASE_TODO_API = "http://localhost:3000/events";
    const fetchTodosAPI = async () => {
      return fetch(BASE_TODO_API).then((res) => res.json());
    };
  
    const postTodoAPI = async (newTodo) => {
      return fetch(BASE_TODO_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }).then((res) => res.json());
    };
  
    const deleteTodoAPI = async (todoId) => {
      return fetch(`${BASE_TODO_API}/${todoId}`, {
        method: "DELETE",
      }).then((res) => res.json());
    };

    const putTodoAPI = async (todoId, updatedTodo) => {
      return fetch(`${BASE_TODO_API}/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }).then((res) => res.json());
    };

    const patchTodoAPI = async (todoId, updatedTodo) => {
      return fetch(`${BASE_TODO_API}/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }).then((res) => res.json());
    };

    return {
      fetchTodosAPI,
      postTodoAPI,
      deleteTodoAPI,
      putTodoAPI,
      patchTodoAPI,
    };
  })();
class TodoModel {
    #todos;
    constructor() {
      this.#todos = [];
    }
  
    setTodos(todos) {
      this.#todos = todos;
    }
  
    get length() {
      return this.#todos.length;
    }
  
    getTodos() {
      return [...this.#todos];
    }
  
    addTodo(newTodo) {
      this.#todos.push(newTodo);
    }

    updateTodo(id, updatedTodo) {
      const index = this.#todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.#todos[index] = updatedTodo;
      }
    }
  
    removeTodo(id) {
      this.#todos = this.#todos.filter((todo) => todo.id !== id);
    }
  }
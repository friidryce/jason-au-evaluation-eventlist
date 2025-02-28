class TodoController {
    #model;
    #view;
    constructor(model, view) {
      this.#model = model;
      this.#view = view;
      this.initApp();
    }
  
    initApp() {
      this.setUpAddButton();
      this.fetchTodos();
      this.setUpRowEvents();
    }
  
  
    fetchTodos() {
      todoAPI.fetchTodosAPI().then((todos) => {
        this.#model.setTodos(todos);
        console.log(todos);
        todos.forEach((todo) => {
          this.#view.renderNewTodo(todo);
        });
      });
    }

    setUpAddButton() {
      this.#view.addTodoBtn.addEventListener("click", () => {
        const addRow = this.#view.renderAddElement();
        this.handleAddRowEvents(addRow);
      });
    }

    setUpRowEvents() {
      this.setUpEditEvent();
      this.setUpDeleteEvent();
    }

    handleRowEvents(todo) {
      const { row, eventInput, startInput, endInput, editBtn, deleteBtn } = todo;

      editBtn.addEventListener("click", () => {
        this.submitNewTodo(eventInput.value, startInput.value, endInput.value, row);
      });
      
      deleteBtn.addEventListener("click", () => {
        this.#model.removeTodo(row.id);
        this.#view.removeTodoElement(row.id);
      });
    }
  
    handleAddRowEvents(addRowElements) {
      const { row, eventInput, startInput, endInput, addBtn, cancelBtn } = addRowElements;
      
      addBtn.addEventListener("click", () => {
        this.submitNewTodo(eventInput.value, startInput.value, endInput.value, row);
      });
      
      cancelBtn.addEventListener("click", () => {
        row.remove();
      });
    }
  
    submitNewTodo(eventName, startDate, endDate, rowToRemove) {
      // Input validation
      if (!eventName || !startDate || !endDate) {
        alert("Input Not Valid!");
        return;
      }
      
      const newTodo = {
        eventName,
        startDate,
        endDate
      };

      todoAPI.postTodoAPI(newTodo).then((_newTodo) => {
        this.#model.addTodo(_newTodo);
        this.#view.renderNewTodo(_newTodo);
        rowToRemove.remove();
      });
    }
  
  
    setUpDeleteEvent() {
      this.#view.todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
          const todoRow = e.target.closest("tr");
          const todoId = todoRow.id;

          todoAPI.deleteTodoAPI(todoId).then(() => {
            this.#model.removeTodo(todoId);
            this.#view.removeTodoElement(todoId);
          });
        }
      });
    }

    setUpEditEvent() {
      this.#view.todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const todoRow = e.target.closest("tr");
          const todoId = todoRow.id;
          
          const todo = this.#model.getTodos().find(todo => todo.id === todoId);
          if (!todo) return;
          
          const editElements = this.#view.renderEditElement(todo);
          this.handleEditRowEvents(editElements);
        }
      });
    }

    handleEditRowEvents(editElements) {
      const { row, originalTodo, eventInput, startInput, endInput, saveBtn, cancelBtn } = editElements;
      
      saveBtn.addEventListener("click", () => {
        this.updateTodo(originalTodo.id, eventInput.value, startInput.value, endInput.value, row);
      });
      
      cancelBtn.addEventListener("click", () => {
        this.#view.renderExistingTodo(originalTodo);
      });
    }
    
    updateTodo(todoId, eventName, startDate, endDate, rowToReplace) {
      // Input validation
      if (!eventName || !startDate || !endDate) {
        alert("Input Not Valid!");
        return;
      }
      
      const updatedTodo = {
        eventName,
        startDate,
        endDate,
        id: todoId,
      };

      todoAPI.putTodoAPI(todoId, updatedTodo).then((_updatedTodo) => {
        this.#model.updateTodo(todoId, _updatedTodo);
        this.#view.renderExistingTodo(_updatedTodo);
      });
    }
  }
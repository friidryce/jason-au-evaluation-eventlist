class TodoView {
    constructor() {
      this.addTodoBtn = document.querySelector("#add-todo-btn");
      this.todoList = document.querySelector(".todo-list tbody");
    }
  
    renderTodoElement(todo) {
      const { id, eventName, startDate, endDate } = todo;
      const todoRow = document.createElement("tr");
      todoRow.id = id;
      todoRow.classList.add("todo-row");

      const event = document.createElement("td");
      event.classList.add("event-name");
      event.textContent = eventName;

      const start = document.createElement("td");
      start.classList.add("start-date");
      start.textContent = startDate;

      const end = document.createElement("td");
      end.classList.add("end-date");
      end.textContent = endDate;

      /* Actions */
      const actions = document.createElement("td");
      actions.classList.add("actions")
      
      const editBtn = document.createElement("button");
      editBtn.classList.add("action-btn", "edit-btn");
      
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("action-btn", "delete-btn");

      actions.append(editBtn, deleteBtn);
      
      /* Append elements to the row */
      todoRow.append(event, start, end, actions);
      return todoRow
    }

    renderNewTodo(todo) {
      const todoRow = this.renderTodoElement(todo);
      this.todoList.appendChild(todoRow);
    }

    renderExistingTodo(todo) {
      const todoRow = this.renderTodoElement(todo);
      const existingRow = document.getElementById(todo.id);
      if (!existingRow) return null;
      existingRow.replaceWith(todoRow);
    }

    renderAddElement() {
      const addRow = document.createElement("tr");
      addRow.classList.add("add-todo-row");

      const event = document.createElement("td");
      const eventInput = document.createElement("input");
      eventInput.type = "text";
      eventInput.classList.add("add-todo-input");
      event.appendChild(eventInput);

      const start = document.createElement("td");
      const startInput = document.createElement("input");
      startInput.type = "date";
      startInput.classList.add("add-todo-input");
      start.appendChild(startInput);

      const end = document.createElement("td");
      const endInput = document.createElement("input");
      endInput.type = "date";
      endInput.classList.add("add-todo-input");
      end.appendChild(endInput);

      const actions = document.createElement("td");
      
      const addBtn = document.createElement("button");
      addBtn.classList.add("action-btn", "add-btn");
      
      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("action-btn", "cancel-btn");
      
      actions.append(addBtn, cancelBtn);

      addRow.append(event, start, end, actions);
      this.todoList.appendChild(addRow);
      
      return {
        row: addRow,
        eventInput,
        startInput,
        endInput,
        addBtn,
        cancelBtn
      };
    }

    renderEditElement(todo) {
      const { id, eventName, startDate, endDate } = todo;

      /* Generate a new row for editing, replace the existing row */
      const existingRow = document.getElementById(id);
      if (!existingRow) return null;
      const editRow = document.createElement("tr");
      editRow.id = id;
      editRow.classList.add("todo-row", "add-todo-row");
      
      const event = document.createElement("td");
      const eventInput = document.createElement("input");
      eventInput.type = "text";
      eventInput.value = eventName;
      eventInput.classList.add("add-todo-input");
      event.appendChild(eventInput);
      
      const start = document.createElement("td");
      const startInput = document.createElement("input");
      startInput.type = "date";
      startInput.value = startDate;
      startInput.classList.add("add-todo-input");
      start.appendChild(startInput);
      
      const end = document.createElement("td");
      const endInput = document.createElement("input");
      endInput.type = "date";
      endInput.value = endDate;
      endInput.classList.add("add-todo-input");
      end.appendChild(endInput);
      
      const actions = document.createElement("td");
      actions.classList.add("actions");
      
      const saveBtn = document.createElement("button");
      saveBtn.classList.add("action-btn", "save-btn");
      
      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("action-btn", "cancel-btn");
      
      actions.append(saveBtn, cancelBtn);
      
      editRow.append(event, start, end, actions);
      
      // Replace the existing row with the edit row
      existingRow.replaceWith(editRow);
      
      return {
        row: editRow,
        originalRow: existingRow,
        originalTodo: todo,
        eventInput,
        startInput,
        endInput,
        saveBtn,
        cancelBtn
      };
    }
  
    removeTodoElement(todoId) {
      const todoRow = document.getElementById(todoId);
      todoRow.remove();
    }
  } 
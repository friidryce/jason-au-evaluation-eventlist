const API_URL = "http://localhost:3000/events";

const todoView = new TodoView();
const todoModel = new TodoModel();

const todoController = new TodoController(todoModel, todoView);
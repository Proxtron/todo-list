import "./css/reset.css"
import "./css/style.css";
import TodoListController from "./modules/controller/TodoListController.js";

const controller = new TodoListController();
controller.renderTodoList();
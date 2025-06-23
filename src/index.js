import "./css/reset.css"
import "./css/style.css";
import ProjectNameMenuController from "./modules/controller/ProjectNameMenuController.js";
import TodoListController from "./modules/controller/TodoListController.js";

const todoListController = new TodoListController();
todoListController.renderTodoList();

const projectNameMenuController = new ProjectNameMenuController();

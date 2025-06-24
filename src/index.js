import "./css/reset.css"
import "./css/style.css";
import ProjectCollection from "./modules/class/ProjectCollection.js";
import ProjectNameMenuController from "./modules/controller/ProjectNameMenuController.js";
import TodoListController from "./modules/controller/TodoListController.js";

const projectCollection = new ProjectCollection();
projectCollection.addProject("My Project");

const projectNameMenuController = new ProjectNameMenuController(projectCollection);

const todoListController = new TodoListController();
todoListController.renderTodoList();



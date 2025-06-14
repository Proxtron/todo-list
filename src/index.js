import "./css/reset.css"
import "./css/style.css";
import TodoItem from "./modules/class/TodoItem.js";
import TodoList from "./modules/class/TodoList.js";
import { createTodoListDisplay } from "./modules/components/TodoListDisplay.js";


const todoList = new TodoList();
todoList.addTodo(new TodoItem("Get a Haircut", "", new Date(2025, 5, 15)));
todoList.addTodo(new TodoItem("Grocery shopping", "", new Date(2025, 5, 17)));
todoList.addTodo(new TodoItem("Pay back my friend", "", new Date(2025, 5, 16)));


document.body.appendChild(createTodoListDisplay(todoList));

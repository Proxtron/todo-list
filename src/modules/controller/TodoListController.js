import TodoList from "../class/TodoList";
import { createTodoListDisplay } from "../components/TodoListDisplay";
import { createTodoAddButton, createTodoAddForm } from "../components/TodoAddDisplay";
import TodoSideBarController from "./TodoSideBarController";
import emitter from "./pubsub";

export default class TodoListController {
    todoList;
    todoSideBarController;

    todoContainer;
    todoListDisplay;
    todoAddBtn;
    todoAddForm;
    todoFormCancelBtn;
    todoFormAddTaskBtn;
    todoTaskTitleInput;

    checkBoxes;
    todoItemDivs;

    constructor() {
        this.todoContainer = document.getElementById("todo-container");
        this.todoSideBarController = new TodoSideBarController();

        emitter.on("sideBarFormChange", () => {
            this.renderTodoList();
        });

        emitter.on("sideBarTaskDelete", (todoId) => {
            this.todoList.removeTodo(todoId);
        });

        emitter.on("projectChange", (todoList) => {
            this.setSelectedTodoList(todoList);
            this.renderTodoList();
        });

        // this.todoList.addTodo("Finalize Q3 performance report and send to management", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Schedule a dentist appointment for a semi-annual check-up", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Renew car registration before the end-of-month deadline", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Research and book flights for the upcoming vacation to Denver", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Complete Module 4 of the online project management course", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Pick up groceries: milk, eggs, bread, and chicken breast", "", new Date("2025", "5", "17"));
        // this.todoList.addTodo("Draft the initial outline for the new website's \"About Us\" page", "", new Date("2025", "5", "17"));
    }

    renderTodoList() {
        this.todoContainer.innerHTML = "";
        const todoListElements = createTodoListDisplay(this.todoList);
        this.todoListDisplay = todoListElements.todoListDiv;

        this.todoItemDivs = todoListElements.todoItemDivs;
        for(let i = 0; i < this.todoItemDivs.length; i++) {
            this.todoItemDivs[i].addEventListener("click", (event) => {
                const clickedOnId = event.currentTarget.id;
                const clickedOnTodo = this.todoList.getTodoById(clickedOnId);
                this.todoSideBarController.handleSideBarState(clickedOnTodo);
            });
        }

        this.checkBoxes = todoListElements.checkBoxes;
        for(let i = 0; i < this.checkBoxes.length; i++) {
            this.checkBoxes[i].addEventListener("click", (event) => {
                event.stopPropagation();
                this.removeTodoFromList(event.currentTarget.id);
            });
        }

        this.todoAddBtn = createTodoAddButton();
        this.todoAddBtn.addEventListener("click", () => {
            this.replaceAddButton();
        });
        this.todoListDisplay.appendChild(this.todoAddBtn);

        this.todoContainer.appendChild(this.todoListDisplay);
    }

    removeTodoFromList(todoId) {
        this.todoList.removeTodo(todoId);
        this.renderTodoList();
    }

    replaceAddButton() {
        const todoAddFormElements = createTodoAddForm();
        this.todoAddForm = todoAddFormElements.todoAddFormDiv;
        this.todoFormCancelBtn = todoAddFormElements.formCancelBtn;
        this.todoFormAddTaskBtn = todoAddFormElements.formAddTask;
        this.todoTaskTitleInput = todoAddFormElements.todoTaskTitleInput;

        this.attachFormEventListeners();
    
        this.todoAddBtn.remove();
        this.todoListDisplay.appendChild(this.todoAddForm);
    }

    attachFormEventListeners() {
        this.todoAddForm.addEventListener("submit", (event) => this.submitAddFormCallback(event));
        this.todoFormCancelBtn.addEventListener("click", () => this.renderTodoList());
        this.todoTaskTitleInput.addEventListener("keyup", (event) => {
            if(this.todoTaskTitleInput.validity.valid) {
                this.todoFormAddTaskBtn.removeAttribute("disabled");
            } else {
                this.todoFormAddTaskBtn.setAttribute("disabled", "");     
            }
        });
    }

    submitAddFormCallback(event) {
        event.preventDefault();
        const addFormData = new FormData(event.target);

        const dateStr = addFormData.get("task_date");
        const dateArr = dateStr.split("-").map((str) => parseInt(str));

        this.todoList.addTodo(
            addFormData.get("task_title"),
            addFormData.get("task_description"),
            dateStr ? new Date(dateArr[0], dateArr[1] - 1, dateArr[2]) : "",
            addFormData.get("task_priority")
        )
        
        this.renderTodoList();
    }

    setSelectedTodoList(todoList) {
        this.todoList = todoList;
    }
}
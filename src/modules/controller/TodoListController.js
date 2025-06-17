import TodoList from "../class/TodoList";
import { createTodoListDisplay } from "../components/TodoListDisplay";
import { createTodoAddButton, createTodoAddForm } from "../components/TodoAddDisplay";

export default class TodoListController {
    todoList;

    todoListDisplay;
    todoAddBtn;
    todoAddForm;
    todoFormCancelBtn;
    todoFormAddTaskBtn;
    todoTaskTitleInput;

    constructor() {
        this.todoList = new TodoList();
    }

    renderTodoList() {
        document.body.innerHTML = "";
        this.todoListDisplay = createTodoListDisplay(this.todoList);

        this.todoAddBtn = createTodoAddButton();
        this.todoAddBtn.addEventListener("click", () => {
            this.replaceAddButton();
        });
        this.todoListDisplay.appendChild(this.todoAddBtn);

        document.body.appendChild(this.todoListDisplay);
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
}
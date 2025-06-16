import TodoList from "../class/TodoList";
import { createTodoListDisplay } from "../components/TodoListDisplay";
import { createTodoAddButton, createTodoAddForm } from "../components/TodoAddDisplay";

export default class TodoListController {
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
        this.todoAddForm = createTodoAddForm();
        
        this.todoAddForm.addEventListener("submit", (event) => {
            this.submitAddFormCallback(event);
        });
    
        this.todoAddBtn.remove();
        this.todoListDisplay.appendChild(this.todoAddForm);
    }

    submitAddFormCallback(event) {
        event.preventDefault();

        const addFormData = new FormData(event.target);

        const dateStr = addFormData.get("task_date");
        const dateArr = dateStr.split("-").map((str) => parseInt(str));

        if(dateStr) {
            this.todoList.addTodo(
                addFormData.get("task_title"),
                addFormData.get("task_description"),
                new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
            ); 
        } else {
            this.todoList.addTodo(
                addFormData.get("task_title"),
                addFormData.get("task_description")
            )
        }
        
        this.renderTodoList();
    }
}
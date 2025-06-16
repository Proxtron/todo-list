import { createTodoItemDisplay } from "./TodoItemDisplay";
import { createTodoAddButton, createTodoAddForm } from "./TodoAddDisplay";

export function createTodoListDisplay(todoList) {
    const todoListDiv = document.createElement("div");
    todoListDiv.classList.add("todo-list-div");

    for(let i = 0; i < todoList.getLength(); i++) {
        todoListDiv.appendChild(createTodoItemDisplay(todoList.getTodo(i)));
    }

    const todoAddButton = createTodoAddButton();
    todoAddButton.addEventListener("click", () => {
        replaceAddButton(todoAddButton, todoListDiv, todoList);
    });
    
    todoListDiv.appendChild(todoAddButton);

    return todoListDiv;
}

function replaceAddButton(addBtn, todoListDiv, todoList) {
    const todoAddForm = createTodoAddForm();

    todoAddForm.addEventListener("submit", (event) => {
        submitAddFormCallback(event, todoListDiv, todoList);
    });

    addBtn.remove();
    todoListDiv.appendChild(todoAddForm);
}

function submitAddFormCallback(event, todoListDiv, todoList) {
    event.preventDefault();

    const addFormData = new FormData(event.target);
    todoList.addTodo(
        addFormData.get("task_title"),
        addFormData.get("task_description"),
        addFormData.get("task_date")
    );

    todoListDiv.remove();
    document.body.appendChild(createTodoListDisplay(todoList));
}

import { createTodoItemDisplay } from "./TodoItemDisplay";

export function createTodoListDisplay(todoList) {
    const todoListDiv = document.createElement("div");
    todoListDiv.classList.add("todo-list-div");

    const checkBoxes = [];
    for(let i = 0; i < todoList.getLength(); i++) {
        const todoItemElements = createTodoItemDisplay(todoList.getTodo(i))
        todoListDiv.appendChild(todoItemElements.todoDiv);
        checkBoxes.push(todoItemElements.todoCheckBox);
    }

    return {
        todoListDiv,
        checkBoxes
    };
}
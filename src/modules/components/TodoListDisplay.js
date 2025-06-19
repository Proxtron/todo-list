import { createTodoItemDisplay } from "./TodoItemDisplay";

export function createTodoListDisplay(todoList) {
    const todoListDiv = document.createElement("div");
    todoListDiv.classList.add("todo-list-div");

    const checkBoxes = [];
    const todoItemDivs = [];
    for(let i = 0; i < todoList.getLength(); i++) {
        const todoItemElements = createTodoItemDisplay(todoList.getTodo(i))
        todoListDiv.appendChild(todoItemElements.todoDiv);
        checkBoxes.push(todoItemElements.todoCheckBox);
        todoItemDivs.push(todoItemElements.todoDiv);
    }

    return {
        todoListDiv,
        checkBoxes,
        todoItemDivs
    };
}
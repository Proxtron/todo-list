import { createTodoItemDisplay } from "./TodoItemDisplay";

export function createTodoListDisplay(todoList) {
    const todoListDiv = document.createElement("div");
    todoListDiv.classList.add("todo-list-div");

    console.log(todoList);
    for(let i = 0; i < todoList.getLength(); i++) {
        todoListDiv.appendChild(createTodoItemDisplay(todoList.getTodo(i)));
    }

    return todoListDiv;
}


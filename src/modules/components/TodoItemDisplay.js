import { format } from "date-fns";

export function createTodoItemDisplay(todoItem) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    const template = `
        <h3 class="todo-item-name">${todoItem.title}</h3>
        <p class="todo-item-date">${
            todoItem.dueDate ?
            format(todoItem.dueDate, "M/d") :
            ""
        }</p>
    `

    todoDiv.innerHTML = template;

    return todoDiv;
}
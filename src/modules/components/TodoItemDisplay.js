import { format } from "date-fns";

export function createTodoItemDisplay(todoItem) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    console.log(todoItem);
    const template = `
        <h2 class="todo-item-name">${todoItem.title}</h2>
        <p class="todo-item-date">${format(todoItem.dueDate, "M/d")}</p>
    `

    todoDiv.innerHTML = template;

    return todoDiv;
}
import { format } from "date-fns";
import { createTodoCheckBox } from "./TodoCheckMark";

export function createTodoItemDisplay(todoItem) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    todoDiv.id = todoItem.id;
    
    const template = `
        <div class="todo-check-mark-div">
        </div>
        <div>
            <p class="todo-item-name">${todoItem.title}</p>
            <p class="todo-item-date">${
                todoItem.dueDate ?
                format(todoItem.dueDate, "M/d") :
                ""
            }</p>
        </div>
    `
    todoDiv.innerHTML = template;

    const todoItemNameHeading = todoDiv.querySelector(".todo-item-name");
    switch(todoItem.priority) {
        case "high":
            todoItemNameHeading.classList.add("urgent-priority");
            break;
        case "medium":
            todoItemNameHeading.classList.add("medium-priority"); 
            break;
        case "low":
            todoItemNameHeading.classList.add("low-priority");
            break;
        default:
            break;
    }
    
    const todoCheckBox = createTodoCheckBox(todoItem);
    todoDiv.querySelector(".todo-check-mark-div").appendChild(todoCheckBox);
    return {
        todoDiv,
        todoCheckBox
    };
}
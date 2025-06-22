import { format } from "date-fns";

export function createTodoSideBar(todoItem) {
    const todoSideBar = document.createElement("div");
    todoSideBar.classList.add("todo-side-bar");

    const template = `
        <div class="sidebar-close-btn-container">
            <p id="sidebar-close-btn" class="sidebar-close-btn">&#10006;</p>
        </div>
        <form>
            <textarea class="title-edit" type="text" placeholder="Task title">${todoItem.title}</textarea>
            <textarea placeholder="Description">${todoItem.description}</textarea>
            <div class="sidebar-input-row">
                <input type="date" value=${todoItem.dueDate ? format(todoItem.dueDate, "yyyy-MM-dd") : ""}>
                <select>
                    <option id="priority-select" value="">Priority</option>
                    <option id="urgent-select" value="high">Urgent</option>
                    <option id="medium-select" value="medium">Medium</option>
                    <option id="low-select" value="low">Low</option>
                </select>
            </div>
        </form>
    `;
    todoSideBar.innerHTML = template;

    switch(todoItem.priority) {
        case "high":
            todoSideBar.querySelector("#urgent-select").selected = true;
            break;
        case "medium":
            todoSideBar.querySelector("#medium-select").selected = true;
            break;
        case "low":
            todoSideBar.querySelector("#low-select").selected = true;
            break;
        case "":
            todoSideBar.querySelector("#priority-select").selected = true;
            break;
        default:
            break;

    }
    return todoSideBar;
}
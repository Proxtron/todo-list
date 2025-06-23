import { format } from "date-fns";

export function createTodoSideBar(todoItem) {
    const todoSideBar = document.createElement("div");
    todoSideBar.classList.add("todo-side-bar");

    const template = `
        <div class="sidebar-close-btn-container">
            <p id="sidebar-close-btn" class="sidebar-close-btn">&#10006;</p>
        </div>
        <form id="sidebar-form">
            <textarea class="title-edit sidebar-input" name="title_edit" placeholder="Task title">${todoItem.title}</textarea>
            <textarea class="sidebar-input" name="description_edit" placeholder="Description">${todoItem.description}</textarea>
            <div class="sidebar-input-row">
                <input class="date-edit sidebar-input" type="date" name="date_edit" value=${todoItem.dueDate ? format(todoItem.dueDate, "yyyy-MM-dd") : ""}>
                <select class="priority-edit sidebar-input" name="priority_edit">
                    <option id="priority-select" value="">Priority</option>
                    <option id="urgent-select" value="high">Urgent</option>
                    <option id="medium-select" value="medium">Medium</option>
                    <option id="low-select" value="low">Low</option>
                </select>
            </div>
            <div class="btns-row">
                <button id="delete-task-btn" class="sidebar-action-btn delete-task-btn">Delete</button>
                <button id="save-task-btn" type="submit" class="sidebar-action-btn save-task-btn">Save</button>
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

    const sideBarForm = todoSideBar.querySelector("#sidebar-form");
    const deleteTaskBtn = todoSideBar.querySelector("#delete-task-btn");
    const saveTaskBtn = todoSideBar.querySelector("#save-task-btn");
    return {
        todoSideBar,
        sideBarForm,
        deleteTaskBtn,
        saveTaskBtn
    };
}
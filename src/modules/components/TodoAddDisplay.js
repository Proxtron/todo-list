export function createTodoAddButton() {
    const todoAddDiv = document.createElement("div");
    todoAddDiv.classList.add("todo-add");

    const template = `
        <h3>+</h3>
        <p class="todo-item-add">Add a Task</p>
    `
    todoAddDiv.innerHTML = template;
    return todoAddDiv;
}

export function createTodoAddForm() {
    const todoAddFormDiv = document.createElement("form");
    todoAddFormDiv.classList.add("todo-add-form");

    const template = `
        <div class="add-form-first-row">
            <input id="task-title-input" class="task-input" type="text" name="task_title" placeholder="Task title" required>
            <input class="task-description-input task-input" "type="text" name="task_description" placeholder="Description">
            <input id="task-date-input" class="task-date-input task-input" type="date" name="task_date">
        </div>
        <div class="add-form-second-row">
            <button id="btn-cancel" class="btn-cancel" type="reset">Cancel</button>
            <button id="btn-add-task" class="btn-add-task" type="submit" disabled>Add Task</button>
        </div>
    `

    todoAddFormDiv.innerHTML = template;

    const formCancelBtn = todoAddFormDiv.querySelector("#btn-cancel");
    const formAddTask = todoAddFormDiv.querySelector("#btn-add-task");
    const todoTaskTitleInput = todoAddFormDiv.querySelector("#task-title-input");
    return {
        todoAddFormDiv,
        formCancelBtn,
        formAddTask,
        todoTaskTitleInput
    };
}
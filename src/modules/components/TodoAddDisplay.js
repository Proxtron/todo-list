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
        <input class="task-input" type="text" name="task_title" placeholder="Task title">
        <input class="task-description-input task-input" "type="text" name="task_description" placeholder="Description">
        <input id="task-date-input" class="task-date-input task-input" type="date" name="task_date">
        <button style="display: none;" type="submit"></button>
    `

    todoAddFormDiv.innerHTML = template;
    return todoAddFormDiv;
}
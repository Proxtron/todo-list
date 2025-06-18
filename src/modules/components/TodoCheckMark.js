

export function createTodoCheckBox(todoItem) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList = "todo-check-mark";
    checkBox.id = `${todoItem.id}`;

    return checkBox;
}
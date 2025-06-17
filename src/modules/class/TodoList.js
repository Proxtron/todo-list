import TodoItem from "./TodoItem";

export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(title, description, date, priority) {
        this.todos.push(new TodoItem(
            title,
            description,
            date,
            priority
        ));
    }

    getTodo(index) {
        return this.todos[index];
    }

    getLength() {
        return this.todos.length;
    }
}
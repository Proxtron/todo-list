import TodoItem from "./TodoItem";

export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(title, description, date) {
        this.todos.push(new TodoItem(
            title,
            description,
            date
        ));
    }

    getTodo(index) {
        return this.todos[index];
    }

    getLength() {
        return this.todos.length;
    }
}
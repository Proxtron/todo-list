export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodo(index) {
        return this.todos[index];
    }

    getLength() {
        return this.todos.length;
    }
}
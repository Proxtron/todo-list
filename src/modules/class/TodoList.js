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

    getTodoById(todoId) {
        for(let i = 0; i < this.todos.length; i++) {
            if(this.todos[i].id === todoId) {
                return this.todos[i];
            }
        }
        
        return null;
    }

    getLength() {
        return this.todos.length;
    }

    removeTodo(todoId) {
        for(let i = 0; i < this.todos.length; i++) {
            if(this.todos[i].id === todoId) {
                this.todos.splice(i, 1);
            }
        }
    }
}
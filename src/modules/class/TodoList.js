import TodoItem from "./TodoItem";
import emitter from "../controller/pubsub";

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
        emitter.emit("stateChange");
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
                emitter.emit("stateChange");
            }
        }
    }
}
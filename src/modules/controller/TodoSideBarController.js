import { createTodoSideBar } from "../components/TodoSideBar";

export default class TodoSideBarController {

    sideBarDiv;
    todoSideBar;
    mainDiv;
    

    constructor() {
        this.sideBarDiv = document.getElementById("side-bar-div");
        this.mainDiv = document.getElementById("main");
        this.todoSideBar = createTodoSideBar();
    }

    openSideBar(todoItem) {
        this.sideBarDiv.appendChild(this.todoSideBar);
        setTimeout(() => {
            this.todoSideBar.classList.toggle("todo-side-bar-open");
            this.mainDiv.classList.toggle("main-side-bar-open");
        });
        
    }

}
import { createTodoSideBar } from "../components/TodoSideBar";

export default class TodoSideBarController {

    sideBarDiv;
    todoSideBar;
    mainDiv;
    sideBarIsOpen;

    constructor() {
        this.sideBarDiv = document.getElementById("side-bar-div");
        this.mainDiv = document.getElementById("main");
        this.sideBarIsOpen = false;

    }

    handleSideBarState(todoItem) {
        if(this.sideBarIsOpen) {
            this.closeSideBar();
        } else {
            this.openSideBar(todoItem);
        }
    }

    openSideBar(todoItem) {
        this.todoSideBar = createTodoSideBar(todoItem);
        this.sideBarDiv.appendChild(this.todoSideBar);
        this.addSideBarEventListeners();

        setTimeout(() => {
            this.sideBarDiv.classList.toggle("side-bar-div-open");
            this.mainDiv.classList.toggle("main-side-bar-open");
        });
        this.sideBarIsOpen = true;
    }

    closeSideBar() {   
        this.sideBarDiv.classList.toggle("side-bar-div-open");
        this.mainDiv.classList.toggle("main-side-bar-open");  
        this.sideBarDiv.innerHTML = "";
        // setTimeout(() => {
        //     this.sideBarDiv.innerHTML = "";
        // }, 300)
        this.sideBarIsOpen = false;
    }

    addSideBarEventListeners() {
        document.getElementById("sidebar-close-btn").addEventListener("click", () => {
            this.closeSideBar();
        });

        // document.addEventListener("click", (event) => {
        //     if(event.target !== this.sideBarDiv) {
        //         this.handleSideBarState();
        //     }
        // });
    }

}
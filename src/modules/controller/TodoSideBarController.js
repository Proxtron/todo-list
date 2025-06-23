import { createTodoSideBar } from "../components/TodoSideBar";
import emitter from "./pubsub";

export default class TodoSideBarController {

    sideBarDiv;
    todoSideBar;
    mainDiv;
    sideBarForm;
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
        const sideBarElements = createTodoSideBar(todoItem);
        this.todoSideBar = sideBarElements.todoSideBar;
        this.sideBarForm = sideBarElements.sideBarForm;
        this.todoItem = todoItem;
        this.deleteTaskBtn = sideBarElements.deleteTaskBtn;
        this.saveTaskBtn = sideBarElements.saveTaskBtn;

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
        this.sideBarIsOpen = false;
        this.todoItem = null;
    }

    addSideBarEventListeners() {
        document.getElementById("sidebar-close-btn").addEventListener("click", () => {
            this.closeSideBar();
        });

        this.sideBarForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(this.sideBarForm);
            const dateStr = formData.get("date_edit");
            const dateArr = dateStr.split("-").map((str) => parseInt(str));

            this.todoItem.editData(
                formData.get("title_edit"),
                formData.get("description_edit"),
                dateStr ? new Date(dateArr[0], dateArr[1] - 1, dateArr[2]) : "",
                formData.get("priority_edit")
            );

            //Tell todoList to rerender
            emitter.emit("sideBarFormChange");
        });

        const inputElements = this.sideBarDiv.querySelectorAll(".sidebar-input");
        inputElements.forEach((element) => {
            element.addEventListener("change", () => {
                this.sideBarForm.dispatchEvent(new Event("submit"));
            });
        });

        this.saveTaskBtn.addEventListener("click", (event) => {
            this.closeSideBar();
        });

        this.deleteTaskBtn.addEventListener("click", () => {
            emitter.emit("sideBarTaskDelete", this.todoItem.id)
            emitter.emit("sideBarFormChange");
            this.closeSideBar();
        });
    }

}
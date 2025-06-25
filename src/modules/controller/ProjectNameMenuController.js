import ProjectCollection from "../class/ProjectCollection";
import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"
import emitter from "./pubsub";

export default class ProjectNameMenuController {
    
    constructor() {
        this.projectCollection = new ProjectCollection();
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.updateDisplayedTodoList();
        this.render();
    }

    render() {
        const projectMenuElements = createProjectNameMenu(this.projectCollection.selectedProject, 
            this.projectCollection.getUnselectedProjects());

        this.projectTitleInput = projectMenuElements.projectTitleInput;
        this.projectNameMenu = projectMenuElements.projectNameMenu;
        this.projectTitleContainer.appendChild(projectMenuElements.projectNameMenu);
        
        this.addEventListeners();
    }

    updateDisplayedTodoList() {
        emitter.emit("projectChange", this.projectCollection.selectedProject.todoList);
    }

    addEventListeners() {
        this.projectNameMenu.addEventListener("click", (event) => {
            console.log("click");
        });
        
        this.projectTitleInput.addEventListener("click", event => event.stopPropagation());
    }

}
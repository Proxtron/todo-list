import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"
import emitter from "./pubsub";

export default class ProjectNameMenuController {
    
    constructor(projectCollection) {
        this.projectCollection = projectCollection;
        this.selectedProject = projectCollection.getProject("My Project");
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.updateDisplayedTodoList();
        this.render();
    }

    render() {
        this.projectTitleContainer.appendChild(createProjectNameMenu(this.selectedProject));
    }

    updateDisplayedTodoList() {
        emitter.emit("projectChange", this.selectedProject.todoList);
    }
}
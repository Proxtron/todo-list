import ProjectCollection from "../class/ProjectCollection";
import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"
import emitter from "./pubsub";

export default class ProjectNameMenuController {
    
    constructor() {
        this.projectCollection = new ProjectCollection();
        this.projectCollection.addProject("My Other Project");
        this.projectCollection.addProject("My Third Project");
        this.projectCollection.addProject("My Fourth Project");
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.updateDisplayedTodoList();
        this.render();
    }

    render() {
        this.projectTitleContainer.innerHTML = "";
        const projectMenuElements = createProjectNameMenu(this.projectCollection.selectedProject, 
            this.projectCollection.getUnselectedProjects());

        this.projectTitleInput = projectMenuElements.projectTitleInput;
        this.projectNameMenu = projectMenuElements.projectNameMenu;
        this.arrowIconElement = projectMenuElements.arrowIconElement;
        this.projectListMenu = projectMenuElements.projectListMenu;
        this.projectTitleBtn = projectMenuElements.projectTitleButton;
        this.projectListMenuRows = projectMenuElements.projectListMenuRows;
        this.titleDisplay = projectMenuElements.titleDisplay;

        this.projectTitleContainer.appendChild(projectMenuElements.projectNameMenu);
        
        this.addEventListeners();
    }

    updateDisplayedTodoList() {
        emitter.emit("projectChange", this.projectCollection.selectedProject.todoList);
    }

    addEventListeners() {
        this.projectNameMenu.addEventListener("click", (event) => {
            this.arrowIconElement.classList.toggle("arrow-icon-rotate");
            this.projectListMenu.classList.toggle("project-list-open");
            this.projectTitleBtn.classList.toggle("btn-menu-open");
        });
        
        this.titleDisplay.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        this.projectTitleInput.addEventListener("change", (event) => {
            const selectedProject = this.projectCollection.selectedProject;
            this.projectCollection.editProjectName(selectedProject.name, this.projectTitleInput.value);
            console.log(this.projectCollection)
        });

        this.projectListMenuRows.forEach((rowElement) => {
            rowElement.addEventListener("click", (event) => {
                event.stopPropagation();
                this.projectCollection.setSelectedProject(rowElement.innerText);
                this.render();
                this.updateDisplayedTodoList();
            })
        });

        
    }

}
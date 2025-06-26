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
        this.inputEnabled = false;
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
        this.errorMsg = projectMenuElements.errorMsg;

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
            //Trying to save
            if(this.inputEnabled) {
                try {
                    const oldName = this.projectCollection.selectedProject.name;
                    const newName = this.projectTitleInput.value;

                    //This will throw if the newName a name of other projects
                    this.projectCollection.editProjectName(oldName, newName);

                    //UI state toggles
                    document.documentElement.style.setProperty("--title-display-icon", "var(--edit-url)");
                    this.inputEnabled = !this.inputEnabled;
                    this.projectTitleInput.toggleAttribute("disabled");
                    this.render();
                } catch(error) {
                    this.showErrorMessage(error.message);
                }
            } 

            //Trying to edit
            else {
                document.documentElement.style.setProperty("--title-display-icon", "var(--check-url)");
                this.inputEnabled = !this.inputEnabled;
                this.projectTitleInput.toggleAttribute("disabled");
            }
        });

        this.projectTitleInput.addEventListener("click", event => event.stopPropagation());

        this.projectListMenuRows.forEach((rowElement) => {
            rowElement.addEventListener("click", (event) => {
                event.stopPropagation();

                this.projectCollection.setSelectedProject(rowElement.innerText);

                document.documentElement.style.setProperty("--title-display-icon", "var(--edit-url)"); 
                this.inputEnabled = false;

                this.render();
                this.updateDisplayedTodoList();
            })
        });
    }

    showErrorMessage(message) {
        this.errorMsg.style.display = "block";
        this.errorMsg.innerText = message
    }

    hideErrorMessage() {
        this.errorMsg.display = "none";
    }
}
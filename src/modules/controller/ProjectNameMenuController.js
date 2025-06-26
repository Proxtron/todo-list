import ProjectCollection from "../class/ProjectCollection";
import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"
import emitter from "./pubsub";

export default class ProjectNameMenuController {
    
    constructor() {
        this.projectCollection = new ProjectCollection();
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.inputEnabled = false;
        this.editNameMode = false;
        this.addNameMode = false;

        this.updateDisplayedTodoList();
        this.render();
    }

    render() {
        this.projectTitleContainer.innerHTML = "";
        this.inputEnabled = false;
        this.editNameMode = false;
        this.addNameMode = false;
        document.documentElement.style.setProperty("--title-display-icon", "var(--edit-url)");

        const unselectedProjects = this.projectCollection.getUnselectedProjects();
        const projectNameMenu = createProjectNameMenu(this.projectCollection.selectedProject, unselectedProjects);

        this.projectNameMenu = projectNameMenu;
        this.projectTitleInput = projectNameMenu.querySelector("#project-title-input");

        this.arrowIconElement = projectNameMenu.querySelector("#arrow-icon");
        if(this.projectCollection.getSize() <= 1) {
            this.arrowIconElement.style.display = "none";
        }

        this.addIconElement = projectNameMenu.querySelector("#add-icon");

        this.projectListMenu = projectNameMenu.querySelector("#project-list-menu");

        this.projectListMenuRows = [];
        for(let i = 0; i < this.projectListMenu.children.length; i++) {
            this.projectListMenuRows.push(this.projectListMenu.children.item(i));
        }

        this.projectTitleBtn = projectNameMenu.querySelector("#project-title-btn");
        this.titleDisplay = projectNameMenu.querySelector("#title-display");
        this.errorMsg = projectNameMenu.querySelector("#error-msg");
        this.deleteIcons = projectNameMenu.querySelectorAll(".delete-project-icon");
        this.cancelIcon = projectNameMenu.querySelector("#cancel-icon");

        this.projectTitleContainer.appendChild(projectNameMenu);
        
        this.addEventListeners();
    }

    updateDisplayedTodoList() {
        emitter.emit("projectChange", this.projectCollection.selectedProject.todoList);
    }

    addEventListeners() {
        this.cancelIcon.addEventListener("click", (event) =>{
            event.stopPropagation();
            this.render();
        });


        this.deleteIcons.forEach((deleteIcon) => {
            deleteIcon.addEventListener("click", (event) => {
                event.stopPropagation();
                const targetProjectName = deleteIcon.dataset.projectname;
                this.projectCollection.removeProject(targetProjectName);
                this.render();
            })
        });

        this.arrowIconElement.addEventListener("click", (event) => {
            this.arrowIconElement.classList.toggle("arrow-icon-rotate");
            this.projectListMenu.classList.toggle("project-list-open");
            this.projectTitleBtn.classList.toggle("btn-menu-open");
        });

        //Input field icons
        this.titleDisplay.addEventListener("click", (event) => {
            event.stopPropagation();
            this.inputIconsCallback();
        });

        //Add Icon
        this.addIconElement.addEventListener("click", (event) => {
            event.stopPropagation();
            this.addCallback();
        });

        //Stops the menu from opening unintended
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

    inputIconsCallback() {
        //Input field is enabled
        if(this.inputEnabled) {
            //User pressed add project icon and now pressed checkmark icon
            if(this.addNameMode) {
                try {
                    const newProjectName = this.projectTitleInput.value;

                    //Throws if theres the same name in the collection
                    const newProject = this.projectCollection.addProject(newProjectName);

                    this.projectCollection.selectedProject = newProject;
                    document.documentElement.style.setProperty("--title-display-icon", "var(--edit-url)");
                    this.render();           
                } catch(error) {
                    this.showErrorMessage(error.message);
                }
            } else if(this.editNameMode){
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
        } 

        //Trying to edit
        else {
            document.documentElement.style.setProperty("--title-display-icon", "var(--check-url)");
            this.inputEnabled = !this.inputEnabled;
            this.projectTitleInput.toggleAttribute("disabled");
            this.cancelIcon.style.display = "block";
            this.titleDisplay.title = "Confirm edit";

            this.editNameMode = true;
            this.addNameMode = false;
        }
    }

    addCallback() {
        //Trying to add
        if(!this.inputEnabled) {
            document.documentElement.style.setProperty("--title-display-icon", "var(--check-url)");

            this.inputEnabled = !this.inputEnabled;
            this.addNameMode = true;
            this.editNameMode = false;

            this.projectTitleInput.toggleAttribute("disabled");
            this.projectTitleInput.placeholder = "New Project Title...";
            this.projectTitleInput.value = "";
            this.cancelIcon.style.display = "block";
        }
    }

    showErrorMessage(message) {
        this.errorMsg.style.display = "block";
        this.errorMsg.innerText = message
    }

    hideErrorMessage() {
        this.errorMsg.display = "none";
    }
}
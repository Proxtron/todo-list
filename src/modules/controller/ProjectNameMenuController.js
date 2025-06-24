import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"

export default class ProjectNameMenuController {
    
    constructor(projectCollection) {
        this.projectCollection = projectCollection;
        this.defaultProject = projectCollection.getProject("My Project");
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.render();
    }

    render() {
        this.projectTitleContainer.appendChild(createProjectNameMenu(this.defaultProject));
    }


}
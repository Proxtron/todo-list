import { createProjectNameMenu } from "../components/ProjectNameMenuDisplay"

export default class ProjectNameMenuController {
    
    constructor() {
        this.projectTitleContainer = document.getElementById("project-title-container");
        this.render();
    }

    render() {
        this.projectTitleContainer.appendChild(createProjectNameMenu());
    }


}
import arrowIcon from "../../assets/arrow.svg";
import deleteIcon from "../../assets/delete-svgrepo-com.svg";
import addIcon from "../../assets/add.svg";

export function createProjectNameMenu(selectedProject, unselectedProjects) {
    const projectNameMenu = document.createElement("div");
    projectNameMenu.classList.add("project-name-menu");
    const template = `
        <p id="error-msg" class="error-msg"></p>
        <div id="project-title-btn" class="project-title-btn">
            <input id="project-title-input" class="project-title-input" type="text" value="${selectedProject.name}" disabled placeholder="Enter a Project Title...">
            <div id="title-display" class="title-display"></div>
            <img id="add-icon" class="add-icon" alt="Add Project">
            <img id="arrow-icon" class="arrow-icon" alt="Arrow">
        </div>
        <div id="project-list-menu" class="project-list-menu">
        </div>
    `

    projectNameMenu.innerHTML = template;

    const arrowIconElement = projectNameMenu.querySelector("#arrow-icon");
    arrowIconElement.src = arrowIcon;

    const addIconElement = projectNameMenu.querySelector("#add-icon");
    addIconElement.src = addIcon;

    const projectListMenu = projectNameMenu.querySelector("#project-list-menu");
    for(let i = 0; i < unselectedProjects.length; i++) {
        const projectListRow = document.createElement("div");
        projectListRow.classList.add("project-list-row");
        projectListRow.innerHTML = `
            <h2 class="project-row-name">${unselectedProjects[i].name}</h2>
        `;

        const deleteProjectIcon = document.createElement("img");
        deleteProjectIcon.src = deleteIcon;
        deleteProjectIcon.dataset.projectname = unselectedProjects[i].name;
        deleteProjectIcon.classList.add("delete-project-icon");
        deleteProjectIcon.alt = "Delete project";
        projectListRow.appendChild(deleteProjectIcon);

        projectListMenu.appendChild(projectListRow);
    }

    return projectNameMenu;
}
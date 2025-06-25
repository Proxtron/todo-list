import arrowIcon from "../../assets/arrow.svg";

export function createProjectNameMenu(selectedProject, unselectedProjects) {
    const projectNameMenu = document.createElement("div");
    projectNameMenu.classList.add("project-name-menu");
    const template = `
        <button id="project-title-btn" class="project-title-btn" type="button">
            <input id="project-title-input" class="project-title-input" type="text" value="${selectedProject.name}" placeholder="Enter a Project Title...">
            <img id="arrow-icon" class="arrow-icon" alt="Arrow">
        </button>
        <div id="project-list-menu" class="project-list-menu">
        </div>
    `

    projectNameMenu.innerHTML = template;
    const arrowIconElement = projectNameMenu.querySelector("#arrow-icon");
    arrowIconElement.src = arrowIcon;

    const projectListMenu = projectNameMenu.querySelector("#project-list-menu");
    const projectListMenuRows = [];
    for(let i = 0; i < unselectedProjects.length; i++) {
        const projectListRow = document.createElement("div");
        projectListRow.classList.add("project-list-row");
        projectListRow.innerHTML = `<h2 class="project-row-name">${unselectedProjects[i].name}</h2>`;
        projectListMenu.appendChild(projectListRow);
        projectListMenuRows.push(projectListRow);
    }


    const projectTitleInput = projectNameMenu.querySelector("#project-title-input");
    const projectTitleButton = projectNameMenu.querySelector("#project-title-btn");
    return {
        projectNameMenu,
        projectTitleInput,
        arrowIconElement,
        projectListMenu,
        projectTitleButton,
        projectListMenuRows
    }
}
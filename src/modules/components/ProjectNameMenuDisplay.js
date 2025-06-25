import arrowIcon from "../../assets/arrow.svg";

export function createProjectNameMenu(selectedProject, unselectedProjects) {
    const projectNameMenu = document.createElement("div");
    projectNameMenu.classList.add("project-name-menu");
    const template = `
        <button class="project-title-btn" type="button">
            <input id="project-title-input" class="project-title-input" type="text" value="${selectedProject.name}" placeholder="Enter a Project Title...">
            <img id="arrow-icon" class="arrow-icon" alt="Arrow">
        </button>
        <div id="project-list-menu" class="project-list-menu">
            
        </div>
    `

    projectNameMenu.innerHTML = template;
    projectNameMenu.querySelector("#arrow-icon").src = arrowIcon;

    const projectListMenu = projectNameMenu.querySelector("#project-list-menu");
    let projectListMenuTemplate = ``;
    for(let i = 0; i < unselectedProjects.length; i++) {
        projectListMenuTemplate += `
            ${unselectedProjects[i].name}
        `;
    }

    projectListMenu.innerHTML = projectListMenuTemplate;

    const projectTitleInput = projectNameMenu.querySelector("#project-title-input");
    return {
        projectNameMenu,
        projectTitleInput
    }
}
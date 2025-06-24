import arrowIcon from "../../assets/arrow.svg";

export function createProjectNameMenu(selectedProject) {
    const projectNameMenu = document.createElement("div");
    projectNameMenu.classList.add("project-name-menu");
    const template = `
        <button class="project-title-btn"type="button">
            <input class="project-title-input" type="text" value="${selectedProject.name}" placeholder="Enter a Project Title...">
            <img id="arrow-icon" class="arrow-icon" alt="Arrow">
        </button>
    `

    projectNameMenu.innerHTML = template;

    projectNameMenu.querySelector("#arrow-icon").src = arrowIcon;
    return projectNameMenu;
}
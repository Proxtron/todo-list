export function createProjectNameMenu() {
    const projectNameMenu = document.createElement("div");
    const template = `
        <h1 class="project-title">Hello, World!</h1>
    `

    projectNameMenu.innerHTML = template;
    return projectNameMenu;
}
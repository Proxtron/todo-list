import Project from "./Project";
import TodoList from "./TodoList";

export default class ProjectCollection {
    constructor() {
        this.projects = [];
        const firstProject = this.addProject("My First Project");
        this.selectedProject = firstProject;
    }

    addProject(name) {
        if(!this.contains(name)) {
            const newProject = new Project(
                name,
                new TodoList()
            );
            this.projects.push(newProject);
            return newProject;
        } else {
            throw new Error("Project Name already exists. Please choose a unique project name!");
        }
        
    }

    contains(name) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].name === name) {
                return true;
            }    
        }
        return false;
    }

    getProject(name) {
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].name === name) {
                return this.projects[i];
            }
        }
    }

    getUnselectedProjects() {
        const unselectedProjects = [];
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i] !== this.selectedProject) {
                unselectedProjects.push(this.projects[i]);
            }
        }
        return unselectedProjects;
    }

    setSelectedProject(name) {
        if(this.contains(name)) {
            this.selectedProject = this.getProject(name);
        } else {
            throw new Error(`Project with name: ${name} does not exist.`)
        }
    }

    editProjectName(oldName, newName) {
        if(this.contains(newName)) {
            throw new Error("Project Name already exists. Please choose a unique project name!");
        }

        const projectToEdit = this.getProject(oldName);
        projectToEdit.name = newName;
    }
}
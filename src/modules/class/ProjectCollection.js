import Project from "./Project";
import TodoList from "./TodoList";

export default class ProjectCollection {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        if(!this.contains(name)) {
            this.projects.push(new Project(
                name,
                new TodoList()
            ));
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
}
import Project from "./Project";
import TodoList from "./TodoList";
import emitter from "../controller/pubsub";
import { format } from "date-fns";

export default class ProjectCollection {
    constructor() {
        this.projects = [];

        //Storage logic
        emitter.on("stateChange", () => {
            this.#populateStorage();
        });

        if(this.#retrieveData() === false) {
            const firstProject = this.addProject("My First Project");
            this.selectedProject = firstProject;
            emitter.emit("stateChange");
        }
    }

    addProject(name) {
        if(!this.contains(name)) {
            const newProject = new Project(
                name,
                new TodoList()
            );
            this.projects.push(newProject);
            emitter.emit("stateChange");
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
            emitter.emit("stateChange");
        } else {
            throw new Error(`Project with name: ${name} does not exist.`)
        }
    }

    editProjectName(oldName, newName) {
        if(oldName !== newName && this.contains(newName)) {
            throw new Error("Project Name already exists. Please choose a unique project name!");
        }

        const projectToEdit = this.getProject(oldName);
        projectToEdit.name = newName;
        emitter.emit("stateChange");
    }

    getSize() {
        return this.projects.length;
    }

    removeProject(name) {
        for(let i = 0; i < this.projects.length; i++) {
            if(name === this.projects[i].name) {
                this.projects.splice(i, 1);
                emitter.emit("stateChange");
            }
        }
    }

    #populateStorage() {
        localStorage.setItem("projectCollection", JSON.stringify(this.projects));
        if(this.selectedProject) {
            localStorage.setItem("selectedProjectName", this.selectedProject.name);
        }
        
    }

    #retrieveData() {
        if(!localStorage.getItem("projectCollection")) {
            return false;
        }

        const retrievedData = JSON.parse(localStorage.getItem("projectCollection"));
        for(let i = 0; i < retrievedData.length; i++) {
            const projectJSON = retrievedData[i];
            const project = this.addProject(projectJSON.name);

            for(let j = 0; j < projectJSON.todoList.todos.length; j++) {
                const todo = projectJSON.todoList.todos[j];
                let todoDate = "";
                if(todo.dueDate) {
                    todoDate = format(todo.dueDate, "y/M/d");
                }
                
                project.todoList.addTodo(
                    todo.title,
                    todo.description,
                    todoDate,
                    todo.priority
                );
            }
        }

        if(localStorage.getItem("selectedProjectName")) {
            this.setSelectedProject(localStorage.getItem("selectedProjectName"));
        } else {

        }
    }
}
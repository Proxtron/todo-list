import {v4 as uuid} from 'uuid';

export default class TodoItem {
    constructor(title, description="", dueDate="", priority="", notes="", checkList="") {
        this.id = uuid();
        this.title = title,
        this.description = description,
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }

    editData(title="", description="", dueDate="", priority="", notes="", checkList="") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }
}
    
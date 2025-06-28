import {v4 as uuid} from 'uuid';
import emitter from '../controller/pubsub';

export default class TodoItem {
    constructor(title, description="", dueDate="", priority="") {
        this.id = uuid();
        this.title = title,
        this.description = description,
        this.dueDate = dueDate;
        this.priority = priority;
    }

    editData(title="", description="", dueDate="", priority="") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        emitter.emit("stateChange");
    }
}
    
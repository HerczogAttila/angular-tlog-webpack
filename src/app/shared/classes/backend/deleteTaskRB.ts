import { MyDate } from '../myDate';
import { Task } from './task';

export class DeleteTaskRB {
    public year: number;
    public month: number;
    public day: number;
    public taskId: string;
    public startTime: string;

    constructor(date: MyDate, task: Task) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.taskId = task.taskId;
        this.startTime = task.startingTime;
    }
}

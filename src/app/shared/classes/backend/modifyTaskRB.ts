import { MyDate } from '../myDate';
import { Task } from './task';

export class ModifyTaskRB {
    public year: number;
    public month: number;
    public day: number;
    public taskId: string;
    public startTime: string;
    public newTaskId: string;
    public newStartTime: string;
    public newEndTime: string;
    public newComment: string;

    constructor(date: MyDate, task: Task, newTaskId: string, newComment: string, newStartTime: string, newEndTime: string) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.taskId = task.taskId;
        this.startTime = task.startingTime;
        this.newTaskId = newTaskId;
        this.newComment = newComment;
        this.newStartTime = newStartTime;
        this.newEndTime = newEndTime;
    }
}

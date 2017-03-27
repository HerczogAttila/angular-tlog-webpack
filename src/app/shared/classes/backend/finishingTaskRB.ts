import { MyDate } from '../myDate';
import { Task } from './task';

export class FinishingTaskRB {
    public year: number;
    public month: number;
    public day: number;
    public taskId: string;
    public startTime: string;
    public endTime: string;

    public static create(date: MyDate, task: Task, endTime: string) {
        return new FinishingTaskRB(date, task.taskId, task.startingTime, endTime);
    }

    constructor(date: MyDate, taskId: string, startTime: string, endTime: string) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.taskId = taskId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

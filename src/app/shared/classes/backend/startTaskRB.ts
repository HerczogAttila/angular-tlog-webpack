import { MyDate } from '../myDate';

export class StartTaskRB {
    public year: number;
    public month: number;
    public day: number;
    public taskId: string;
    public comment: string;
    public startTime: string;

    constructor(date: MyDate, taskId: string, comment: string, startTime: string) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.taskId = taskId;
        this.comment = comment;
        this.startTime = startTime;
    }
}

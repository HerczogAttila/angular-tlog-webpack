import { MyDate } from '../myDate';
import { ModifyTaskComponent } from  '../../../task-list/task-table/modify-task/modify-task.component';

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

    constructor(date: MyDate, modifyTask: ModifyTaskComponent) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.taskId = modifyTask.selectedTask.taskId;
        this.startTime = modifyTask.selectedTask.startingTime;
        this.newTaskId = modifyTask.newTaskId;
        this.newComment = modifyTask.newComment;
        if (modifyTask.newStartTime) {
            this.newStartTime = modifyTask.newStartTime;
        }
        if (modifyTask.newEndTime) {
            this.newEndTime = modifyTask.newEndTime;
        }
    }
}

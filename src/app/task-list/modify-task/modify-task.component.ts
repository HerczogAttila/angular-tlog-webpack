import { Component, Input } from '@angular/core';
import { ModifyTaskRB } from '../../shared/classes/backend/modifyTaskRB';
import { WeekService } from '../../shared/services/week.service';
import { TaskListComponent } from '../task-list.component';
import { Task } from '../../shared/classes/backend/task';

@Component({
    selector: 'my-modify-task',
    templateUrl: 'modify-task.component.html',
    styleUrls: ['modify-task.component.scss'],
})

export class ModifyTaskComponent {
    @Input() selectedTask: Task;
    @Input() taskList: TaskListComponent;

    constructor(private weekService: WeekService) {}

    public modifyTask(taskId: string, comment: string, startTime: string, endTime: string): void {
        let date = this.taskList.date;
        let selectedTask = this.taskList.selectedTask;

        let modifyTask = new ModifyTaskRB();
        modifyTask.year = date.getYear();
        modifyTask.month = date.getMonth();
        modifyTask.day = date.getDay();
        modifyTask.taskId = selectedTask.taskId;

        modifyTask.newTaskId = taskId;
        modifyTask.newComment = comment;

        if (selectedTask.startingTime) {
            modifyTask.startTime = selectedTask.startingTime;
            modifyTask.newStartTime = startTime;
        }
        if (selectedTask.endingTime) {
            modifyTask.newEndTime = endTime;
        }

        this.weekService.modifyTask(modifyTask).subscribe(() => this.taskList.refreshWorkDay());
        this.taskList.selectedTask = null;
    }
}

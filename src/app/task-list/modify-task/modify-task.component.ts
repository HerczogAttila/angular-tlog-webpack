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
    @Input() public selectedTask: Task;
    @Input() public taskList: TaskListComponent;

    constructor(private weekService: WeekService) {}

    public modifyTask(taskId: string, comment: string, startTime: string, endTime: string): void {
        let date = this.taskList.date;
        let selectedTask = this.taskList.selectedTask;

        if (!selectedTask.startingTime) {
            return;
        }

        let modifyTask = new ModifyTaskRB(date, selectedTask, taskId, comment, startTime, endTime);
        this.weekService.modifyTask(modifyTask)
            .subscribe(() => this.taskList.refreshWorkDay());
        this.taskList.selectedTask = null;
    }
}

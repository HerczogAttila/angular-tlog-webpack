import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/classes/backend/task';
import { DeleteTaskRB } from '../../shared/classes/backend/deleteTaskRB';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../../shared/services/week.service';
import { FinishingTaskRB } from '../../shared/classes/backend/finishingTaskRB';
import { StartTaskRB } from '../../shared/classes/backend/startTaskRB';

@Component({
    selector: 'my-task-table',
    templateUrl: 'task-table.component.html',
    styleUrls: ['task-table.component.scss'],
})

export class TaskTableComponent {
    @Input() public tasks: Task[];
    @Output() public refresh = new EventEmitter();

    public confirmDeleteVisible = false;
    public startTaskError = false;

    public taskId = '';
    public comment = '';
    public startTime = TaskTableComponent.getActualTime();

    public selectedTask: Task;
    private requestDeleteTask: Task;

    private static getActualTime(): string {
        let date = new Date();
        let minutes = date.getMinutes() - date.getMinutes() % 15 + '';
        if (minutes === '0') {
            minutes = '00';
        }

        return date.getHours() + ':' + minutes;
    }

    constructor(private weekService: WeekService) {}

    public onCreateTask(): void {
        let startTask = new StartTaskRB(this.weekService.selectedDay, this.taskId, this.comment, this.startTime);
        this.weekService.startTask(startTask)
            .subscribe(() => this.refresh.emit(),
                error => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        this.startTaskError = true;
                    }
                });

        this.taskId = '';
        this.comment = '';
        this.startTime = TaskTableComponent.getActualTime();
    }

    public onRequestDeleteTask(task: Task): void {
        this.confirmDeleteVisible = true;
        this.requestDeleteTask = task;
    }

    public onConfirmDeleteTask(): void {
        if (!this.requestDeleteTask || !this.requestDeleteTask.startingTime) {
            return;
        }

        if (this.selectedTask === this.requestDeleteTask) {
            this.selectedTask = null;
        }

        let deleteTask = new DeleteTaskRB(this.weekService.selectedDay, this.requestDeleteTask);
        this.weekService.deleteTask(deleteTask)
            .subscribe(() => this.refresh.emit());
    }

    public finishingTask(task: Task): void {
        if (!task || !task.startingTime) {
            return;
        }

        task.endingTime = TaskTableComponent.getActualTime();
        let finishingTask = new FinishingTaskRB(this.weekService.selectedDay, task);
        this.weekService.finishingTask(finishingTask)
            .subscribe(() => this.refresh.emit());
    }

    public onSelectTask(task: Task): void {
        this.selectedTask = task;
    }

    public onModifyTask(): void {
        this.refresh.emit();
        this.selectedTask = null;
    }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/classes/backend/task';
import { DeleteTaskRB } from '../../shared/classes/backend/deleteTaskRB';
import { WeekService } from '../../shared/services/week.service';
import { FinishingTaskRB } from '../../shared/classes/backend/finishingTaskRB';
import { StartTaskRB } from '../../shared/classes/backend/startTaskRB';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';
import { STATUS_CODE_NOT_MODIFIED, NetworkService } from '../../shared/services/network.service';

@Component({
    selector: 'my-task-table',
    templateUrl: 'task-table.component.html',
    styleUrls: ['task-table.component.scss'],
})

export class TaskTableComponent {
    @Input() public tasks: Task[];
    @Output() public refresh = new EventEmitter();

    public confirmDeleteVisible = false;

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

    constructor(
        private weekService: WeekService,
        private networkService: NetworkService,
    ) {}

    public onCreateTask(): void {
        let startTask = new StartTaskRB(this.weekService.getSelectedDay(), this.taskId, this.comment, this.startTime);
        this.networkService.startTask(startTask)
            .subscribe(
                () => this.refresh.emit(),
                error => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        ErrorModalComponent.show('The task can not be created');
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

        let deleteTask = new DeleteTaskRB(this.weekService.getSelectedDay(), this.requestDeleteTask);
        this.networkService.deleteTask(deleteTask)
            .subscribe(() => this.refresh.emit());
    }

    public finishingTask(task: Task): void {
        if (!task || !task.startingTime) {
            return;
        }

        let finishingTask = FinishingTaskRB.create(this.weekService.getSelectedDay(), task, TaskTableComponent.getActualTime());
        this.networkService.finishingTask(finishingTask)
            .subscribe(
                () => this.refresh.emit(),
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        ErrorModalComponent.show('Invalid data');
                    }
                }
            );
    }

    public onSelectTask(task: Task): void {
        this.selectedTask = task;
    }

    public onModifyTask(): void {
        this.refresh.emit();
        this.selectedTask = null;
    }
}

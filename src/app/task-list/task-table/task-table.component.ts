import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/classes/backend/task';
import { DeleteTaskRB } from '../../shared/classes/backend/deleteTaskRB';
import { WeekService } from '../../shared/services/week.service';
import { FinishingTaskRB } from '../../shared/classes/backend/finishingTaskRB';
import { TaskListComponent } from '../task-list.component';

@Component({
    selector: 'my-task-table',
    templateUrl: 'task-table.component.html',
    styleUrls: ['task-table.component.scss'],
})

export class TaskTableComponent {
    @Input() public tasks: Task[];
    @Output() public refresh = new EventEmitter();

    public confirmDeleteVisible = false;

    public selectedTask: Task;
    private requestDeleteTask: Task;

    constructor(private weekService: WeekService) {}

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

        task.endingTime = TaskListComponent.getActualTime();
        let finishingTask = new FinishingTaskRB(this.weekService.selectedDay, task);
        this.weekService.finishingTask(finishingTask)
            .subscribe(() => this.refresh.emit());
    }

    public onModifyTask(): void {
        this.refresh.emit();
        this.selectedTask = null;
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModifyTaskRB } from '../../shared/classes/backend/modifyTaskRB';
import { WeekService } from '../../shared/services/week.service';
import { Task } from '../../shared/classes/backend/task';

@Component({
    selector: 'my-modify-task',
    templateUrl: 'modify-task.component.html',
    styleUrls: ['modify-task.component.scss'],
})

export class ModifyTaskComponent {
    @Input() public selectedTask: Task;
    @Input() public newTaskId = '';
    @Input() public newComment = '';
    @Input() public newStartTime = '';
    @Input() public newEndTime = '';

    @Output() public modify = new EventEmitter();

    constructor(private weekService: WeekService) {}

    public modifyTask(): void {
        if (!this.selectedTask.startingTime) {
            return;
        }

        let modifyTask = new ModifyTaskRB(this.weekService.selectedDay, this);
        this.weekService.modifyTask(modifyTask)
            .subscribe(() => this.modify.emit());
    }
}

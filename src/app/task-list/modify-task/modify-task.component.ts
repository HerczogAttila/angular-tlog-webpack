import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModifyTaskRB } from '../../shared/classes/backend/modifyTaskRB';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../../shared/services/week.service';
import { Task } from '../../shared/classes/backend/task';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';

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
            .subscribe(
                () => this.modify.emit(),
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        ErrorModalComponent.show('Invalid data');
                    }
                }
            );
    }
}

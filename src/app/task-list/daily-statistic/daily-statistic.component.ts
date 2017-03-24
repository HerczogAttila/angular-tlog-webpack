import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyDate } from '../../shared/classes/myDate';
import { Task } from '../../shared/classes/backend/task';
import { ModifyWorkDayRB } from '../../shared/classes/backend/modifyWorkDayRB';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../../shared/services/week.service';

@Component({
    selector: 'my-daily-statistic',
    templateUrl: 'daily-statistic.component.html',
    styleUrls: ['daily-statistic.component.scss'],
})

export class DailyStatisticComponent {
    @Input() public date: MyDate;
    @Input() public tasks: Task[];
    @Output() public refresh = new EventEmitter();

    public edit = false;
    public error = false;

    public requiredWorkingMinutes: number;

    constructor(private weekService: WeekService) {}

    public onEditRequiredWorkingMinutes() {
        this.edit = true;
        this.requiredWorkingMinutes = this.date.requiredWorkMinutes;
    }

    public onModifyDay(): void {
        let modifyWorkDay = new ModifyWorkDayRB(this.date, this.requiredWorkingMinutes);
        this.weekService.modifyWorkDay(modifyWorkDay)
            .subscribe(
                () => this.refresh.emit(),
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        console.log('teszt');
                        this.error = true;
                    }
                }
            );

        this.edit = false;
    }
}

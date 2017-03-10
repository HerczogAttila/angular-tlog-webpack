import { Component, Input } from '@angular/core';
import { MyDate } from '../../shared/classes/myDate';
import { Task } from '../../shared/classes/backend/task';

@Component({
    selector: 'my-daily-statistic',
    templateUrl: 'daily-statistic.component.html',
})

export class DailyStatisticComponent {
    @Input() date: MyDate;
    @Input() tasks: Task[];
}

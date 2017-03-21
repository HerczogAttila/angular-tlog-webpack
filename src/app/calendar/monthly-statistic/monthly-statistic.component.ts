import { Component } from '@angular/core';
import { WeekService } from '../../shared/services/week.service';

@Component({
    selector: 'my-monthly-statistic',
    templateUrl: 'monthly-statistic.component.html',
    styleUrls: ['monthly-statistic.component.scss'],
})

export class MonthlyStatisticComponent {
    constructor(public weekService: WeekService) { }
}

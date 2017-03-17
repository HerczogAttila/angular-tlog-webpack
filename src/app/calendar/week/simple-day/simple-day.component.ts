import { Component, Input } from '@angular/core';
import { MyDate, DayType } from '../../../shared/classes/myDate';
import { WeekService } from '../../../shared/services/week.service';
import { WorkDayRB } from '../../../shared/classes/backend/workDayRB';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'my-simple-day',
  templateUrl: 'simple-day.component.html',
})

export class SimpleDayComponent {
  @Input() date: MyDate;

  weekendConfirmMessage = 'Are you sure working on weekend?';

  constructor(
      public translate: TranslateService,
      private weekService: WeekService,
  ) {
    translate.get(this.weekendConfirmMessage).subscribe((res: string) => {
      this.weekendConfirmMessage = res;
    });
  }

  public onNewWorkday(): void {
    let workDay = new WorkDayRB();
    workDay.year = this.date.year;
    workDay.month = this.date.month + 1;
    workDay.day = this.date.day;
    workDay.requiredHours = 450;

    if (this.date.weekend) {
      if (confirm(this.weekendConfirmMessage)) {
        this.weekService.addWorkDayWeekend(workDay).subscribe(data => this.responseNewWorkDay(data));
      }
    } else {
      this.weekService.addWorkDay(workDay).subscribe(data => this.responseNewWorkDay(data));
    }
  }

  private responseNewWorkDay(jsonData: string): void {
    try {
      let workDay = JSON.parse(jsonData);

      this.date.type = DayType.Work;
      this.date.requiredWorkMinutes = workDay.requiredMinPerDay;
      this.date.extraMinutes = workDay.extraMinPerDay;
      this.date.minutes = workDay.sumMinPerDay;
      this.weekService.refreshStatistics();
    } catch (Error) {
      console.error(Error.message);
    }
  }
}

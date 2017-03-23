import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyDate } from '../../../shared/classes/myDate';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../../../shared/services/week.service';
import { WorkDayRB } from '../../../shared/classes/backend/workDayRB';
import { TranslateService } from 'ng2-translate';
import { WorkDay } from '../../../shared/classes/backend/workDay';
import { Response } from '@angular/http';

@Component({
  selector: 'my-simple-day',
  templateUrl: 'simple-day.component.html',
  styleUrls: ['simple-day.component.scss'],
})

export class SimpleDayComponent {
  @Input() public date: MyDate;
  @Output() public newDayError = new EventEmitter();

  private weekendConfirmMessage = 'Are you sure working on weekend?';

  constructor(
      public translate: TranslateService,
      private weekService: WeekService,
  ) {
    translate.get(this.weekendConfirmMessage)
        .subscribe((res: string) => {
      this.weekendConfirmMessage = res;
    });
  }

  public onNewWorkday(): void {
    let workDay = new WorkDayRB(this.date, 450);

    if (this.date.isWeekend()) {
      if (confirm(this.weekendConfirmMessage)) {
        this.addWorkDayWeekend(workDay);
      }
    } else {
      this.addWorkDay(workDay);
    }
  }

  private addWorkDayWeekend(workDay: WorkDayRB): void {
    this.weekService.addWorkDayWeekend(workDay)
        .subscribe(
            day => this.responseNewWorkDay(day),
            error => this.errorNewWorkDay(error)
        );
  }

  private addWorkDay(workDay: WorkDayRB): void {
    this.weekService.addWorkDay(workDay)
        .subscribe(
            day => this.responseNewWorkDay(day),
            error => this.errorNewWorkDay(error)
        );
  }

  private responseNewWorkDay(workDay: WorkDay): void {
    this.date.makeWorkDay(workDay);
    this.weekService.refreshStatistics();
  }

  private errorNewWorkDay(error: Response): void {
    if (error.status === STATUS_CODE_NOT_MODIFIED) {
      this.newDayError.emit();
    }
  }
}

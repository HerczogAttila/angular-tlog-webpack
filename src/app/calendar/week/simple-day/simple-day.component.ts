import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyDate } from '../../../shared/classes/myDate';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../../../shared/services/week.service';
import { WorkDayRB } from '../../../shared/classes/backend/workDayRB';
import { WorkDay } from '../../../shared/classes/backend/workDay';
import { Response } from '@angular/http';
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal.component';

@Component({
  selector: 'my-simple-day',
  templateUrl: 'simple-day.component.html',
  styleUrls: ['simple-day.component.scss'],
})

export class SimpleDayComponent {
  @Input() public date: MyDate;
  @Output() public confirmNewDayWeekend = new EventEmitter();

  constructor(private weekService: WeekService) { }

  public onNewWorkday(): void {
    let workDay = new WorkDayRB(this.date, 450);

    if (this.date.isWeekend()) {
      this.confirmNewDayWeekend.emit(this);
    } else {
      this.addWorkDay(workDay);
    }
  }

  public addWorkDayWeekend(workDay: WorkDayRB): void {
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
      ErrorModalComponent.show('You can not create a working day in the future');
    }
  }
}

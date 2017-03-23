import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Week } from '../../shared/classes/week';
import { SimpleDayComponent } from './simple-day/simple-day.component';

@Component({
  selector: 'my-week',
  templateUrl: 'week.component.html',
})

export class WeekComponent {
  @Input() public week: Week;
  @Output() public newDayError = new EventEmitter();
  @Output() public confirmNewDayWeekend = new EventEmitter();

  public onNewDayError(): void {
    this.newDayError.emit();
  }

  public onConfirmNewDayWeekend(day: SimpleDayComponent): void {
    this.confirmNewDayWeekend.emit(day);
  }
}

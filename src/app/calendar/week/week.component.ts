import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Week } from '../../shared/classes/week';

@Component({
  selector: 'my-week',
  templateUrl: 'week.component.html',
})

export class WeekComponent {
  @Input() public week: Week;
  @Output() public newDayError = new EventEmitter();

  public onNewDayError(): void {
    this.newDayError.emit();
  }
}

import { Component } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';

@Component({
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
})

export class CalendarComponent {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
      public weekService: WeekService,
      private pagerService: PagerService,
  ) { }

  deleteAll() {
    this.weekService.deleteAll().subscribe(() => this.pagerService.refresh());
  }
}

import { Component, OnInit } from '@angular/core';
import { PagerService } from '../shared/services/pager.service';
import { NetworkService } from '../shared/services/network.service';
import { WeekService } from '../shared/services/week.service';

@Component({
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  public daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
      public weekService: WeekService,
      private networkService: NetworkService,
      private pagerService: PagerService,
  ) { }

  public ngOnInit(): void {
    this.pagerService.init();
  }

  public deleteAll(): void {
    this.networkService.deleteAll()
        .subscribe(() => this.pagerService.refresh());
  }
}

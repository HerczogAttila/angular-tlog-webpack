import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';
import { Router } from '@angular/router';
import { SimpleDayComponent } from './week/simple-day/simple-day.component';
import { WorkDayRB } from '../shared/classes/backend/workDayRB';

@Component({
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  public daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public isWeekend = false;

  public day: SimpleDayComponent;

  constructor(
      public weekService: WeekService,
      private pagerService: PagerService,
      private router: Router,
  ) { }

  public ngOnInit(): void {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(['/login']).catch(error => {
        console.error(error);
      });
    } else {
      this.pagerService.init();
    }
  }

  public onConfirmNewDayWeekend(day: SimpleDayComponent): void {
    this.day = day;
    this.isWeekend = true;
  }

  public onConfirm(): void {
    if (!this.day) {
      return;
    }

    this.day.addWorkDayWeekend(new WorkDayRB(this.day.date, 450));
    this.day = null;
  }

  public deleteAll(): void {
    this.weekService.deleteAll().subscribe(() => this.pagerService.refresh());
  }
}

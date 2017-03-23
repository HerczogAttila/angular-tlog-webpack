import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  public daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  public deleteAll(): void {
    this.weekService.deleteAll().subscribe(() => this.pagerService.refresh());
  }
}

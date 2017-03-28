import { Component, OnInit } from '@angular/core';
import { PagerService } from '../shared/services/pager.service';
import { Router } from '@angular/router';
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
    this.networkService.deleteAll().subscribe(() => this.pagerService.refresh());
  }
}

import { Component, Input } from '@angular/core';
import { MyDate } from '../../../shared/classes/myDate';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { WeekService } from '../../../shared/services/week.service';

@Component({
  selector: 'my-workday',
  templateUrl: 'workday.component.html',
})

export class WorkdayComponent {
  app = AppComponent;

  @Input() day: MyDate;

  constructor(
      private router: Router,
      private weekService: WeekService,
  ) { }

  navigateTaskList() {
    this.weekService.selectedDay = this.day;
    this.router.navigate(['/task-list']);
  }
}

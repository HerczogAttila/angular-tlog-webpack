import { Component, Input } from '@angular/core';
import { MyDate } from '../../../shared/classes/myDate';
import { Router } from '@angular/router';
import { WeekService } from '../../../shared/services/week.service';

@Component({
  selector: 'my-workday',
  templateUrl: 'workday.component.html',
})

export class WorkdayComponent {
  @Input() date: MyDate;

  constructor(
      private router: Router,
      private weekService: WeekService,
  ) { }

  public navigateTaskList(): void {
    this.weekService.selectedDay = this.date;
    this.router.navigate(['/task-list']).catch(error => {
      console.error(error);
    });
  }
}

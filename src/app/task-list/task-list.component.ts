import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { MyDate } from '../shared/classes/myDate';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';
import { Task } from '../shared/classes/backend/task';
import { Router } from '@angular/router';
import { WorkDay } from '../shared/classes/backend/workDay';

@Component({
  selector: 'my-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.scss'],
})

export class TaskListComponent implements OnInit {
  public date: MyDate;
  public tasks: Task[] = [];
  public days: MyDate[] = [];

  public taskId: string;

  constructor(
      private weekService: WeekService,
      private pagerService: PagerService,
      private router: Router,
  ) { }

  public ngOnInit(): void {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(['/login'])
          .catch(error => {
            console.error(error);
          }
      );
    } else {
      this.pagerService.init();
      this.pagerService.refresh().subscribe(() => {
        this.date = this.weekService.getSelectedDay();
        this.days = this.weekService.getDays();
        this.refreshWorkDay();
      });
    }
  }

  public changeWorkDay(): void {
    this.weekService.setSelectedDayIfExist(this.date);
    this.refreshWorkDay();
  }

  public refreshWorkDay(): void {
    if (this.date) {
      this.weekService.getWorkDay(this.date)
          .subscribe(
              workDay => {
                this.readWorkDay(workDay);
              }
          );
    }
  }

  private readWorkDay(workDay: WorkDay): void {
    this.weekService.getSelectedDay().requiredWorkMinutes = workDay.requiredMinPerDay;
    this.weekService.getSelectedDay().minutes = workDay.sumMinPerDay;
    this.weekService.getSelectedDay().extraMinutes = this.date.minutes - this.date.requiredWorkMinutes;
    this.tasks = workDay.tasks;
    this.pagerService.refresh();
  }
}

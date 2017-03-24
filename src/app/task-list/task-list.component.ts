import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { MyDate } from '../shared/classes/myDate';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/backend/startTaskRB';
import { PagerService } from '../shared/services/pager.service';
import { ModifyWorkDayRB } from '../shared/classes/backend/modifyWorkDayRB';
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


  public taskId: string;

  public startTaskError = false;

  public static getActualTime(): string {
    let date = new Date();
    let minutes = date.getMinutes() - date.getMinutes() % 15 + '';
    if (minutes === '0') {
      minutes = '00';
    }

    return date.getHours() + ':' + minutes;
  }

  constructor(
      private weekService: WeekService,
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
      this.pagerService.refresh().subscribe(() => {
        this.date = this.weekService.selectedDay;
        this.refreshWorkDay();
      });
    }
  }

  public modifyDay(reqWorkMinutes: number): void {
    if (!reqWorkMinutes) {
      return;
    }

    let modifyWorkDay = new ModifyWorkDayRB(this.date, reqWorkMinutes);
    this.weekService.modifyWorkDay(modifyWorkDay)
        .subscribe(jsonData => {
      this.readWorkDay(jsonData);
    });
  }

  public startTask(): void {
    if (!this.taskId)  {
      return;
    }

    let startTask = new StartTaskRB(this.date, this.taskId, '', TaskListComponent.getActualTime());
    this.weekService.startTask(startTask)
        .subscribe(() => this.refreshWorkDay(),
            error => {
              if (error.status === STATUS_CODE_NOT_MODIFIED) {
                this.startTaskError = true;
              }
            }
        );
    this.taskId = '';
  }

  public refreshWorkDay(): void {
    if (this.date) {
      this.weekService.getWorkDay(this.date)
          .subscribe(jsonData => {
        this.readWorkDay(jsonData);
      });
    }
  }

  private readWorkDay(workDay: WorkDay): void {
    this.weekService.selectedDay.requiredWorkMinutes = workDay.requiredMinPerDay;
    this.weekService.selectedDay.minutes = workDay.sumMinPerDay;
    this.weekService.selectedDay.extraMinutes = this.date.minutes - this.date.requiredWorkMinutes;
    this.tasks = workDay.tasks;
    this.date = this.weekService.selectedDay;
    this.pagerService.refresh();
  }
}

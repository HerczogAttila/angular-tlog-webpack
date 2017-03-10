import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { MyDate } from '../shared/classes/myDate';
import { WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/startTaskRB';
import { DeleteTaskRB } from '../shared/classes/deleteTaskRB';
import { ModifyTaskRB } from '../shared/classes/modifyTaskRB';
import { PagerService } from '../shared/services/pager.service';
import { FinishingTaskRB } from '../shared/classes/finishingTaskRB';
import { ModifyWorkDayRB } from '../shared/classes/modifyWorkDay';

@Component({
  selector: 'my-task-list',
  templateUrl: 'task-list.component.html',
})

export class TaskListComponent implements OnInit {
  date: MyDate;
  selectedTask: any;

  constructor(
      private weekService: WeekService,
      private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.pagerService.refresh().subscribe(() => {
      this.date = this.weekService.selectedDay;
      this.refreshWorkDay();
    });
  }

  modifyDay(reqWorkMinutes: number) {
    if (!reqWorkMinutes) {
      return;
    }

    let modifyWorkDay = new ModifyWorkDayRB();
    modifyWorkDay.year = this.date.year;
    modifyWorkDay.month = this.date.month + 1;
    modifyWorkDay.day = this.date.day;
    modifyWorkDay.requiredMinutes = reqWorkMinutes;
    this.weekService.modifyWorkDay(modifyWorkDay).subscribe(jsonData => {
      this.readWorkDay(jsonData);
    });
  }

  startTask(id: string) {
    if (!id)  {
      return;
    }

    let startTask = new StartTaskRB();
    startTask.year = this.date.year;
    startTask.month = this.date.month + 1;
    startTask.day = this.date.day;
    startTask.taskId = id;
    startTask.startTime = this.getActualTime();
    this.weekService.startTask(startTask).subscribe(() => this.refreshWorkDay());
  }

  finishingTask(task: any) {
    if (!task) {
      return;
    }

    let finishingTask = new FinishingTaskRB();
    finishingTask.year = this.date.year;
    finishingTask.month = this.date.month + 1;
    finishingTask.day = this.date.day;
    finishingTask.taskId = task.taskId;
    finishingTask.startTime = task.startTime;
    finishingTask.endTime = this.getActualTime();
    if (task.startTime) {
      finishingTask.startTime = task.startTime.hour + ':' + task.startTime.minute;
    }

    this.weekService.finishingTask(finishingTask).subscribe(() => {
      this.refreshWorkDay();
    });
  }

  deleteTask(task: any) {
    if (!task) {
      return;
    }

    if (this.selectedTask === task) {
      this.selectedTask = null;
    }

    let deleteTask = new DeleteTaskRB();
    deleteTask.year = this.date.year;
    deleteTask.month = this.date.month + 1;
    deleteTask.day = this.date.day;
    deleteTask.taskId = task.taskId;
    if (task.startTime) {
      deleteTask.startTime = task.startTime.hour + ':' + task.startTime.minute;
    }

    this.weekService.deleteTask(deleteTask).subscribe(() => this.refreshWorkDay());
  }

  modifyTask(taskId: string, comment: string, startHour: string, startMinute: string, endHour: string, endMinute: string) {

    let modifyTask = new ModifyTaskRB();
    modifyTask.year = this.date.year;
    modifyTask.month = this.date.month + 1;
    modifyTask.day = this.date.day;
    modifyTask.taskId = this.selectedTask.taskId;

    modifyTask.newTaskId = taskId;
    modifyTask.newComment = comment;

    if (this.selectedTask.startTime) {
      modifyTask.startTime = this.selectedTask.startTime.hour + ':' + this.selectedTask.startTime.minute;
      modifyTask.newStartTime = startHour + ':' + startMinute;
    }
    if (this.selectedTask.endTime) {
      modifyTask.newEndTime = endHour + ':' + endMinute;
    }

    this.weekService.modifyTask(modifyTask).subscribe(() => this.refreshWorkDay());
    this.selectedTask = null;
  }

  refreshWorkDay() {
    if (this.date) {
      this.weekService.getWorkDay(this.date).subscribe(jsonData =>  {
        this.readWorkDay(jsonData);
      });
    }
  }

  readWorkDay(jsonData: string) {
    let workDay = JSON.parse(jsonData);
    this.weekService.selectedDay.requiredWorkMinutes = workDay.requiredMinPerDay;
    this.weekService.selectedDay.minutes = workDay.sumMinPerDay;
    this.weekService.selectedDay.extraMinutes = this.date.minutes - this.date.requiredWorkMinutes;
    this.weekService.selectedDay.tasks = workDay.tasks;
    this.date = this.weekService.selectedDay;
    this.pagerService.refresh();
  }

  onSelect(t: any): void {
    this.selectedTask = t;
  }

  getActualTime() {
    let date = new Date();
    let minutes = date.getMinutes() - date.getMinutes() % 15 + '';
    if (minutes === '0') {
      minutes = '00';
    }

    return date.getHours() + ':' + minutes;
  }
}

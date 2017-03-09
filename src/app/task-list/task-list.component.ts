import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Day } from '../shared/classes/day';
import { WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/startTaskRB';
import { DeleteTaskRB } from '../shared/classes/DeleteTaskRB';
import { ModifyTaskRB } from '../shared/classes/ModifyTaskRB';
import { PagerService } from '../shared/services/pager.service';
import { FinishingTaskRB } from '../shared/classes/FinishingTaskRB';

@Component({
  selector: 'my-task-list',
  templateUrl: 'task-list.component.html',
})

export class TaskListComponent implements OnInit {
  date: Day;
  selectedTask: any;

  constructor(
      private weekService: WeekService,
      private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.pagerService.refresh().subscribe(() => {
      this.date = this.weekService.selectedDay;
      this.refreshTasks();
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
    this.weekService.startTask(startTask).subscribe(() => this.refreshTasks());
  }

  finishingTask(task: any) {
    if (!task) {
      return;
    }

    console.log(task);

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
      this.refreshTasks();
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

    this.weekService.deleteTask(deleteTask).subscribe(() => this.refreshTasks());
  }

  modifyDay(minutes: number) {
    // this.date.requiredWorkMinutes = +reqMin;
    this.date.minutes = +minutes;
    this.date.extraMinutes = this.date.minutes - this.date.requiredWorkMinutes;
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

    this.weekService.modifyTask(modifyTask).subscribe(() => this.refreshTasks());
    this.selectedTask = null;
  }

  refreshTasks() {
    if (this.date) {
      this.weekService.getTasks(this.date).subscribe(data => this.getTasks(data));
    }
  }

  getTasks(jsonData: string) {
    this.date.tasks = JSON.parse(jsonData);
  }

  onSelect(t: any): void {
    this.selectedTask = t;
  }

  getActualTime() {
    let date = new Date();
    let minutes = date.getMinutes() - date.getMinutes() % 15 + '';
    console.log(minutes);
    if (minutes === '0') {
      minutes = '00';
    }

    return date.getHours() + ':' + minutes;
  }
}

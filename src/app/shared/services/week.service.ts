import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { WorkDayRB } from '../classes/backend/workDayRB';
import { StartTaskRB } from '../classes/backend/startTaskRB';
import { MyDate, DayType } from '../classes/myDate';
import { DeleteTaskRB } from '../classes/backend/deleteTaskRB';
import { ModifyTaskRB } from '../classes/backend/modifyTaskRB';
import { FinishingTaskRB } from '../classes/backend/finishingTaskRB';
import { ModifyWorkDayRB } from '../classes/backend/modifyWorkDayRB';

@Injectable()
export class WeekService {
    weeks: Week[] = [];

    selectedDay: MyDate;

    workdays: number;
    reqWorkMinutes: number;
    minutes: number;
    extraMinutes: number;

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    ip = 'localhost';
    port = 9080;

    urlBase = 'http://' + this.ip + ':' + this.port;

    urlGetMonths = this.urlBase + '/timelogger/workmonths/';
    urlDeleteAll = this.urlBase + '/timelogger/workmonths/deleteall';

    urlAddWorkDay = this.urlBase + '/timelogger/workmonths/workdays';
    urlAddWorkDayWeekend = this.urlBase + '/timelogger/workmonths/workdaysweekend';
    urlGetWorkDay = this.urlBase + '/timelogger/workmonths/workdays/';
    urlModifyWorkDay = this.urlBase + '/timelogger/workmonths/workdays/modify';

    urlGetTasks = this.urlBase + '/timelogger/workmonths/';
    urlStartTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/start';
    urlFinishingTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/finish';
    urlModifyTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/modify';
    urlDeleteTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/delete';

    constructor (private http: Http) {}

    public refreshStatistics(): void {
        this.reqWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.workdays = 0;
        for (let w of this.weeks) {
            for (let d of w.days) {
                this.reqWorkMinutes += d.requiredWorkMinutes;
                this.minutes += d.minutes;
                this.extraMinutes += d.extraMinutes;
                if (d.type === DayType.Work) {
                    this.workdays++;
                }
            }
        }
    }

    public getMonthWorkDays(year: number, month: number): Observable<any> {
        return this.http.get(this.urlGetMonths + year + '/' + month)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    public addWorkDay(workDay: WorkDayRB): Observable<any> {
        return this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    public addWorkDayWeekend(workDay: WorkDayRB): Observable<any> {
        return this.http.post(this.urlAddWorkDayWeekend, JSON.stringify(workDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    public getWorkDay(date: MyDate): Observable<any> {
        return this.http.get(this.urlGetWorkDay + date.year + '/' + (date.month + 1) + '/' + date.day, this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    public modifyWorkDay(modifyWorkDay: ModifyWorkDayRB): Observable<any> {
        return this.http.put(this.urlModifyWorkDay, JSON.stringify(modifyWorkDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    public getTasks(date: MyDate): Observable<any> {
        let url = this.urlGetTasks + date.year + '/' + (date.month + 1) + '/' + date.day;
        return this.http.get(url, this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    public startTask(startTask: StartTaskRB): Observable<any> {
        return this.http.post(this.urlStartTask, JSON.stringify(startTask), this.options)
            .catch(this.handleError);
    }
    public finishingTask(finishingTask: FinishingTaskRB): Observable<any> {
        return this.http.put(this.urlFinishingTask, JSON.stringify(finishingTask), this.options)
            .catch(this.handleError);
    }
    public modifyTask(modifyTask: ModifyTaskRB): Observable<any> {
        return this.http.put(this.urlModifyTask, JSON.stringify(modifyTask), this.options)
            .catch(this.handleError);
    }
    public deleteTask(deleteTask: DeleteTaskRB): Observable<any> {
        return this.http.put(this.urlDeleteTask, JSON.stringify(deleteTask), this.options)
            .catch(this.handleError);
    }

    public deleteAll(): Observable<any> {
        return this.http.put(this.urlDeleteAll, this.options)
            .catch(this.handleError);
    }

    private extractDataText(res: Response) {
        return res.text() || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

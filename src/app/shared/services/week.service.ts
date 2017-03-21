import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { WorkDayRB } from '../classes/backend/workDayRB';
import { StartTaskRB } from '../classes/backend/startTaskRB';
import { MyDate } from '../classes/myDate';
import { DeleteTaskRB } from '../classes/backend/deleteTaskRB';
import { ModifyTaskRB } from '../classes/backend/modifyTaskRB';
import { FinishingTaskRB } from '../classes/backend/finishingTaskRB';
import { ModifyWorkDayRB } from '../classes/backend/modifyWorkDayRB';
import { UserRB } from '../classes/backend/userRB';

@Injectable()
export class WeekService {
    weeks: Week[] = [];

    selectedDay: MyDate;

    workdays: number;
    reqWorkMinutes: number;
    minutes: number;
    extraMinutes: number;

    headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtToken') });
    options = new RequestOptions({ headers: this.headers });

    ip = 'localhost';
    port = 9080;
    login = !!localStorage.getItem('jwtToken');

    urlBase = 'http://' + this.ip + ':' + this.port + '/timelogger/';

    urlRegistering = this.urlBase + 'registering';
    urlAuthenticate = this.urlBase + 'authenticate';
    urlRefresh = this.urlBase + 'refresh';
    urlExistUser = this.urlBase + 'isExistUser';

    urlGetMonths = this.urlBase + 'workmonths/';
    urlDeleteAll = this.urlBase + 'workmonths/deleteall';

    urlAddWorkDay = this.urlBase + 'workmonths/workdays';
    urlAddWorkDayWeekend = this.urlBase + 'workmonths/workdaysweekend';
    urlGetWorkDay = this.urlBase + 'workmonths/workdays/';
    urlModifyWorkDay = this.urlBase + 'workmonths/workdays/modify';

    urlGetTasks = this.urlBase + 'workmonths/';
    urlStartTask = this.urlBase + 'workmonths/workdays/tasks/start';
    urlFinishingTask = this.urlBase + 'workmonths/workdays/tasks/finish';
    urlModifyTask = this.urlBase + 'workmonths/workdays/tasks/modify';
    urlDeleteTask = this.urlBase + 'workmonths/workdays/tasks/delete';

    private static extractDataText(res: Response) {
        return res.text() || { };
    }

    private static handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(error);
    }

    constructor (private http: Http) {}

    public getExtraMinutesColor(): string {
        return (this.extraMinutes >= 0) ? 'green' : 'red';
    }

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
                if (d.isWorkDay()) {
                    this.workdays++;
                }
            }
        }
    }

    public registering(user: UserRB): Observable<any> {
        return this.http.post(this.urlRegistering, JSON.stringify(user), this.options)
            .map(WeekService.extractDataText);
    }
    public authenticate(user: UserRB): Observable<any> {
        return this.http.post(this.urlAuthenticate, JSON.stringify(user), this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public refresh(): Observable<any> {
        return this.http.post(this.urlRefresh, {}, this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public isExistUserName(userName: string): Observable<any> {
        return this.http.post(this.urlExistUser, userName, this.options);
    }

    public getMonthWorkDays(year: number, month: number): Observable<any> {
        return this.http.get(this.urlGetMonths + year + '/' + month, this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }

    public addWorkDay(workDay: WorkDayRB): Observable<any> {
        return this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public addWorkDayWeekend(workDay: WorkDayRB): Observable<any> {
        return this.http.post(this.urlAddWorkDayWeekend, JSON.stringify(workDay), this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public getWorkDay(date: MyDate): Observable<any> {
        return this.http.get(this.urlGetWorkDay + date.year + '/' + (date.month + 1) + '/' + date.day, this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public modifyWorkDay(modifyWorkDay: ModifyWorkDayRB): Observable<any> {
        return this.http.put(this.urlModifyWorkDay, JSON.stringify(modifyWorkDay), this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }

    public getTasks(date: MyDate): Observable<any> {
        let url = this.urlGetTasks + date.year + '/' + (date.month + 1) + '/' + date.day;
        return this.http.get(url, this.options)
            .map(WeekService.extractDataText)
            .catch(WeekService.handleError);
    }
    public startTask(startTask: StartTaskRB): Observable<any> {
        return this.http.post(this.urlStartTask, JSON.stringify(startTask), this.options);
    }
    public finishingTask(finishingTask: FinishingTaskRB): Observable<any> {
        return this.http.put(this.urlFinishingTask, JSON.stringify(finishingTask), this.options)
            .catch(WeekService.handleError);
    }
    public modifyTask(modifyTask: ModifyTaskRB): Observable<any> {
        return this.http.put(this.urlModifyTask, JSON.stringify(modifyTask), this.options)
            .catch(WeekService.handleError);
    }
    public deleteTask(deleteTask: DeleteTaskRB): Observable<any> {
        return this.http.put(this.urlDeleteTask, JSON.stringify(deleteTask), this.options)
            .catch(WeekService.handleError);
    }

    public deleteAll(): Observable<any> {
        return this.http.put(this.urlDeleteAll, { }, this.options)
            .catch(WeekService.handleError);
    }

    public setJWTToken(token: string): void {
        localStorage.setItem('jwtToken', token);
        this.login = true;
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtToken') });
        this.options = new RequestOptions({ headers: this.headers });
    }
}

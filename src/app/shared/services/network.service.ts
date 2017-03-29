import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { DeleteTaskRB } from '../classes/backend/deleteTaskRB';
import { ModifyTaskRB } from '../classes/backend/modifyTaskRB';
import { FinishingTaskRB } from '../classes/backend/finishingTaskRB';
import { StartTaskRB } from '../classes/backend/startTaskRB';
import { MyDate } from '../classes/myDate';
import { WorkDay } from '../classes/backend/workDay';
import { ModifyWorkDayRB } from '../classes/backend/modifyWorkDayRB';
import { WorkDayRB } from '../classes/backend/workDayRB';
import { UserRB } from '../classes/backend/userRB';

export const STATUS_CODE_NOT_MODIFIED = 304;
export const STATUS_CODE_UNAUTHORIZED = 401;

@Injectable()
export class NetworkService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtToken') });
    private options = new RequestOptions({ headers: this.headers });

    private ip = 'localhost';
    private port = 9080;

    private urlBase = 'http://' + this.ip + ':' + this.port + '/timelogger/';

    private urlRegistering = this.urlBase + 'registering';
    private urlAuthenticate = this.urlBase + 'authenticate';
    private urlRefresh = this.urlBase + 'refresh';
    private urlExistUser = this.urlBase + 'isExistUser';

    private urlGetMonths = this.urlBase + 'workmonths/';
    private urlDeleteAll = this.urlBase + 'workmonths/deleteall';

    private urlAddWorkDay = this.urlBase + 'workmonths/workdays';
    private urlAddWorkDayWeekend = this.urlBase + 'workmonths/workdaysweekend';
    private urlGetWorkDay = this.urlBase + 'workmonths/workdays/';
    private urlModifyWorkDay = this.urlBase + 'workmonths/workdays/modify';

    private urlStartTask = this.urlBase + 'workmonths/workdays/tasks/start';
    private urlFinishingTask = this.urlBase + 'workmonths/workdays/tasks/finish';
    private urlModifyTask = this.urlBase + 'workmonths/workdays/tasks/modify';
    private urlDeleteTask = this.urlBase + 'workmonths/workdays/tasks/delete';

    private static extractDataText(response: Response): string {
        return response.text();
    }

    private static extractDataJson(response: Response) {
        return JSON.parse(response.text());
    }

    constructor (private http: Http) {}

    public refreshHeader(): void {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtToken') });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public registering(user: UserRB): Observable<Response> {
        return this.http.post(this.urlRegistering, JSON.stringify(user), this.options);
    }
    public authenticate(user: UserRB): Observable<string> {
        return this.http.post(this.urlAuthenticate, JSON.stringify(user), this.options)
            .map(NetworkService.extractDataText);
    }
    public refresh(): Observable<string> {
        return this.http.post(this.urlRefresh, {}, this.options)
            .map(NetworkService.extractDataText);
    }
    public isExistUserName(userName: string): Observable<Response> {
        return this.http.post(this.urlExistUser, userName, this.options);
    }

    public getMonthWorkDays(date: Date): Observable<WorkDay[]> {
        return this.http.get(this.urlGetMonths + date.getFullYear() + '/' + (date.getMonth() + 1), this.options)
            .map(NetworkService.extractDataJson);
    }

    public addWorkDay(workDay: WorkDayRB): Observable<WorkDay> {
        return this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .map(NetworkService.extractDataJson);
    }
    public addWorkDayWeekend(workDay: WorkDayRB): Observable<WorkDay> {
        return this.http.post(this.urlAddWorkDayWeekend, JSON.stringify(workDay), this.options)
            .map(NetworkService.extractDataJson);
    }
    public getWorkDay(date: MyDate): Observable<WorkDay> {
        return this.http.get(this.urlGetWorkDay + date.getYear() + '/' + date.getMonth() + '/' + date.getDay(), this.options)
            .map(NetworkService.extractDataJson);
    }
    public modifyWorkDay(modifyWorkDay: ModifyWorkDayRB): Observable<WorkDay> {
        return this.http.put(this.urlModifyWorkDay, JSON.stringify(modifyWorkDay), this.options)
            .map(NetworkService.extractDataJson);
    }
    public startTask(startTask: StartTaskRB): Observable<Response> {
        return this.http.post(this.urlStartTask, JSON.stringify(startTask), this.options);
    }
    public finishingTask(finishingTask: FinishingTaskRB): Observable<Response> {
        return this.http.put(this.urlFinishingTask, JSON.stringify(finishingTask), this.options);
    }
    public modifyTask(modifyTask: ModifyTaskRB): Observable<Response> {
        return this.http.put(this.urlModifyTask, JSON.stringify(modifyTask), this.options);
    }
    public deleteTask(deleteTask: DeleteTaskRB): Observable<Response> {
        return this.http.put(this.urlDeleteTask, JSON.stringify(deleteTask), this.options);
    }

    public deleteAll(): Observable<Response> {
        return this.http.put(this.urlDeleteAll, { }, this.options);
    }
}

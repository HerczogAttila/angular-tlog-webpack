import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { WorkDayRB } from '../classes/workDayRB';
import { StartTaskRB } from '../classes/startTaskRB';
import { Day } from '../classes/day';
import { DeleteTaskRB } from '../classes/DeleteTaskRB';
import { ModifyTaskRB } from '../classes/ModifyTaskRB';

@Injectable()
export class WeekService {
    weeks: Week[] = [];

    selectedDay: Day;

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

    urlGetTasks = this.urlBase + '/timelogger/workmonths/';
    urlStartTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/start';
    urlModifyTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/modify';
    urlDeleteTask = this.urlBase + '/timelogger/workmonths/workdays/tasks/delete';

    constructor (private http: Http) {}

    getMonth(year: number, month: number) {
        return this.http.get(this.urlGetMonths + year + '/' + month)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    addWorkDay(workDay: WorkDayRB) {
        return this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    getTasks(day: Day) {
        let url = this. urlGetTasks + day.year + '/' + (day.month + 1) + '/' + day.day;
        return this.http.get(url, this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    startTask(startTask: StartTaskRB) {
        return this.http.post(this.urlStartTask, JSON.stringify(startTask), this.options)
            .catch(this.handleError);
    }
    modifyTask(modifyTask: ModifyTaskRB) {
        return this.http.put(this.urlModifyTask, JSON.stringify(modifyTask), this.options)
            .catch(this.handleError);
    }
    deleteTask(deleteTask: DeleteTaskRB) {
        return this.http.put(this.urlDeleteTask, JSON.stringify(deleteTask), this.options)
            .catch(this.handleError);
    }

    deleteAll() {
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

    update() {
        this.reqWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.workdays = 0;
        for (let w of this.weeks) {
            for (let d of w.days) {
                this.reqWorkMinutes += d.requiredWorkMinutes;
                this.minutes += d.minutes;
                this.extraMinutes += d.extraMinutes;
                if (d.type === 'work') {
                    this.workdays++;
                }
            }
        }
    }
}

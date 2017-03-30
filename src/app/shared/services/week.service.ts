import { Injectable } from '@angular/core';
import { Week } from '../classes/week';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MyDate } from '../classes/myDate';

@Injectable()
export class WeekService {
    public workdaysCount: number;
    public reqWorkMinutes: number;
    public minutes: number;
    public extraMinutes: number;

    private weeks: Week[] = [];
    private workDays: MyDate[] = [];

    private selectedDay = 0;

    public refreshStatistics(): void {
        this.reqWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.workdaysCount = this.workDays.length;
        for (let w of this.weeks) {
            for (let d of w.days) {
                this.reqWorkMinutes += d.requiredWorkMinutes;
                this.minutes += d.minutes;
                this.extraMinutes += d.extraMinutes;
            }
        }
    }

    public getDays(): MyDate[] {
        return this.workDays;
    }

    public getWeeks(): Week[] {
        return this.weeks;
    }

    public getSelectedDay(): MyDate {
        return this.workDays[this.selectedDay];
    }

    public setSelectedDayIfExist(date: MyDate): boolean {
        let i = 0;
        for (let day of this.workDays) {
            if (date.date.getDate() === day.date.getDate()) {
                this.selectedDay = i;
                return true;
            }
            i++;
        }

        return false;
    }

    public clear() {
        this.weeks = [];
        this.workDays = [];
    }

    public fillWeek(): void {
        let week = this.lastWeek();
        if (week) {
            while (!week.isFull()) {
                week.days.push(new MyDate());
            }
        }
    }

    public addDay(day: MyDate): void {
        let week = this.lastWeek();
        if (!week || week.isFull()) {
            this.newWeek();
            week = this.lastWeek();
        }
        week.days.push(day);
        this.addWorkDay(day);
    }

    public addWorkDay(day: MyDate): void {
        if (day.isWorkDay()) {
            this.workDays.push(day);
        }
    }

    private lastWeek(): Week {
        return this.weeks[this.weeks.length - 1];
    }

    private newWeek(): void {
        this.weeks.push(new Week());
    }
}

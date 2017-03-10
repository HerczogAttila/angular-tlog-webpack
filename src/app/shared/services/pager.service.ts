import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { Week } from '../classes/week';
import { MyDate, DayType } from '../classes/myDate';
import { WorkDay } from '../classes/backend/workDay';
import Any = jasmine.Any;
import { Observable } from 'rxjs';

@Injectable()
export class PagerService {
    year: number;
    month: number;

    monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December' ];
    dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    actualMonth: string;

    constructor(private weekService: WeekService) { }

    public init(): void {
        if (this.weekService.weeks.length === 0) {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.refresh();
        } else {
            this.actualMonth = this.monthsOfYear[this.month];
        }
    }

    public previousMonth(): void {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }

        this.refresh();
    }

    public nextMonth(): void {
        this.month = (this.month + 1) % 12;
        if (this.month === 0) {
            this.year++;
        }

        this.refresh();
    }

    public refresh(): Observable<Any> {
        let workDays = this.weekService.getMonthWorkDays(this.year, this.month + 1);
        workDays.subscribe(jsonData => this.createWeeks(jsonData));

        return workDays;
    }

    private createWeeks(jsonData: string): void {
        this.actualMonth = this.monthsOfYear[this.month];

        let workdays: WorkDay[] = JSON.parse(jsonData);

        let firstDay = new Date(this.year, this.month, 1);
        let startingDay = firstDay.getDay() % 7;

        let days: MyDate[] = [];
        let weeks: Week[] = [];
        let day: MyDate;
        for (let i = 0; i < startingDay; i++) {
            day = new MyDate();
            day.type = DayType.Empty;
            days.push(day);
        }

        let dayCount = this.getMonthDayCount();
        let week: Week;
        for (let i = 1; i <= dayCount; i++) {
            day = new MyDate();
            day.type = DayType.Simple;
            for (let wd of workdays) {
                if (wd.actualDay.dayOfMonth === i) {
                    day.type = DayType.Work;
                    day.extraMinutes = wd.extraMinPerDay;
                    day.requiredWorkMinutes = wd.requiredMinPerDay;
                    day.minutes = wd.sumMinPerDay;
                    if (!this.weekService.selectedDay) {
                        this.weekService.selectedDay = day;
                    }
                }
            }

            day.day = i;
            day.month = this.month;
            day.year = this.year;
            days.push(day);
            if (days.length === 1 || days.length === 7) {
                day.weekend = true;
            }
            if (days.length === 7) {
                week = new Week();
                week.days = days;
                days = [];
                weeks.push(week);
            }
        }

        if (days.length > 0) {
            week = new Week();
            week.days = days;
            weeks.push(week);
        }

        this.weekService.weeks = weeks;
        this.weekService.refreshStatistics();
    }

    private getMonthDayCount(): number {
        if (this.month === 1) {
            return ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
        }

        return this.dayInMonth[this.month];
    }
}

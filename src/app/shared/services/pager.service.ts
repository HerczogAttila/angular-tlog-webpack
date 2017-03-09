import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { Week } from '../classes/week';
import { MyDate, DayType } from '../classes/myDate';

@Injectable()
export class PagerService {
    year: number;
    month: number;

    monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December' ];
    dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    actualMonth: string;

    constructor(private weekService: WeekService) { }

    createWeeks(jsonData: string) {
        this.actualMonth = this.monthsOfYear[this.month];

        let workdays: any[] = JSON.parse(jsonData);

        let firstDay = new Date(this.year, this.month, 1);
        let startingDay = firstDay.getDay() % 7;

        let days: MyDate[] = [];
        let weeks: Week[] = [];
        let d: MyDate;
        for (let i = 0; i < startingDay; i++) {
            d = new MyDate();
            d.type = DayType.Empty;
            days.push(d);
        }

        let dayCount = this.getMonthDayCount();
        let w: Week;
        for (let i = 1; i <= dayCount; i++) {
            d = new MyDate();
            d.type = DayType.Simple;
            for (let wd of workdays) {
                if (wd.actualDay.dayOfMonth === i) {
                    d.type = DayType.Work;
                    d.extraMinutes = wd.extraMinPerDay;
                    d.requiredWorkMinutes = wd.requiredMinPerDay;
                    d.minutes = wd.sumMinPerDay;
                    if (!this.weekService.selectedDay) {
                        this.weekService.selectedDay = d;
                    }
                }
            }

            d.day = i;
            d.month = this.month;
            d.year = this.year;
            days.push(d);
            if (days.length === 1 || days.length === 7) {
                d.weekend = true;
            }
            if (days.length === 7) {
                w = new Week();
                w.days = days;
                days = [];
                weeks.push(w);
            }
        }

        if (days.length > 0) {
            w = new Week();
            w.days = days;
            weeks.push(w);
        }

        this.weekService.weeks = weeks;
        this.weekService.update();
    }

    previousMonth() {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }

        this.refresh();
    }

    nextMonth() {
        this.month = (this.month + 1) % 12;
        if (this.month === 0) {
            this.year++;
        }

        this.refresh();
    }

    getMonthDayCount() {
        if (this.month === 1) {
            return ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
        }

        return this.dayInMonth[this.month];
    }

    refresh() {
        let month = this.weekService.getMonth(this.year, this.month + 1);
        month.subscribe(data => this.createWeeks(data));

        return month;
    }

    init() {
        if (this.weekService.weeks.length === 0) {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.refresh();
        } else {
            this.actualMonth = this.monthsOfYear[this.month];
        }
    }
}

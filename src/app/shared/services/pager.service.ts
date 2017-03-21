import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { Week } from '../classes/week';
import { MyDate, DayType } from '../classes/myDate';
import { WorkDay } from '../classes/backend/workDay';
import Any = jasmine.Any;
import { Observable } from 'rxjs';

const DAYS_IN_WEEK = 7;
const MONTHS_IN_YEAR = 12;
const FEBRUARY = 1;
const SUNDAY = 1;
const SATURDAY = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS_NAME = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December' ];

@Injectable()
export class PagerService {
    year: number;
    month: number;
    actualMonthName: string;

    constructor(private weekService: WeekService) { }

    public init(): void {
        if (this.weekService.weeks.length === 0) {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.refresh();
        } else {
            this.actualMonthName = MONTHS_NAME[this.month];
        }
    }

    public previousMonth(): void {
        this.month--;
        if (this.month < 0) {
            this.month = MONTHS_IN_YEAR - 1;
            this.year--;
        }

        this.refresh();
    }

    public nextMonth(): void {
        this.month = (this.month + 1) % MONTHS_IN_YEAR;
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
        this.actualMonthName = MONTHS_NAME[this.month];

        let workdays: WorkDay[] = JSON.parse(jsonData);

        let firstDay = new Date(this.year, this.month, 1);
        let startingDay = firstDay.getDay() % DAYS_IN_WEEK;

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
                let x = new WorkDay();
                x.date = wd.date;

                if (x.getDayOfMonth() === i) {
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
            if (days.length === SUNDAY || days.length === SATURDAY) {
                day.weekend = true;
            }
            if (days.length === SATURDAY) {
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
        if (this.month === FEBRUARY) {
            return (this.isLeapYear()) ? 29 : 28;
        }

        return DAYS_IN_MONTH[this.month];
    }

    private isLeapYear(): boolean {
        return ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0);
    }
}

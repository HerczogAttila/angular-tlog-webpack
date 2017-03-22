import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { MyDate } from '../classes/myDate';
import { WorkDay } from '../classes/backend/workDay';
import Any = jasmine.Any;
import { Observable } from 'rxjs';

const DAYS_IN_WEEK = 7;

@Injectable()
export class PagerService {
    public date: Date;

    constructor(private weekService: WeekService) { }

    public init(): void {
        if (this.weekService.weeks.length === 0) {
            this.date = new Date();
            this.refresh();
        }
    }

    public previousMonth(): void {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
        this.refresh();
    }

    public nextMonth(): void {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        this.refresh();
    }

    public refresh(): Observable<Any> {
        let workDays = this.weekService.getMonthWorkDays(this.date.getFullYear(), this.date.getMonth() + 1);
        workDays.subscribe(jsonData => this.createDays(jsonData));

        return workDays;
    }

    private createDays(jsonData: string): void {
        this.weekService.weeks = [];
        let workdays: WorkDay[] = JSON.parse(jsonData);

        this.createEmptyDays();

        let dayCount = this.getMonthDayCount();
        for (let i = 1; i <= dayCount; i++) {
            this.weekService.addDay(this.createDay(workdays, i));
        }

        this.weekService.refreshStatistics();
    }

    private createEmptyDays(): void {
        let firstDay = new Date(this.date);
        let startingDay = firstDay.getDay() % DAYS_IN_WEEK;

        for (let i = 0; i < startingDay; i++) {
            this.weekService.addDay(new MyDate());
        }
    }

    private getMonthDayCount(): number {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    }

    private createDay(days: WorkDay[], dayOfMonth: number): MyDate {
        let now = new Date(this.date.getFullYear(), this.date.getMonth(), dayOfMonth);
        for (let wd of days) {
            let x = new WorkDay();
            x.date = wd.date;

            if (x.getDayOfMonth() === dayOfMonth) {
                let workDay = MyDate.workDay(now, wd);
                if (!this.weekService.selectedDay) {
                    this.weekService.selectedDay = workDay;
                }

                return workDay;
            }
        }

        return MyDate.simpleDay(now);
    }
}

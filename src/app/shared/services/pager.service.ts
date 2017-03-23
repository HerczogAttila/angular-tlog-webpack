import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { MyDate } from '../classes/myDate';
import { WorkDay } from '../classes/backend/workDay';
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

    public refresh(): Observable<WorkDay[]> {
        let workDays = this.weekService.getMonthWorkDays(this.date);
        workDays.subscribe(days => this.createDays(days));

        return workDays;
    }

    private createDays(workdays: WorkDay[]): void {
        this.weekService.weeks = [];
        this.createEmptyDays();

        let dayCount = this.getMonthDayCount();
        for (let i = 1; i <= dayCount; i++) {
            this.weekService.addDay(this.createDay(workdays, i));
        }

        this.weekService.refreshStatistics();
    }

    private createEmptyDays(): void {
        let firstDay = new Date(this.date.getFullYear(), this.date.getMonth());
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
        for (let day of days) {
            let x = new WorkDay();
            x.date = day.date;

            // console.log(x);
            // console.log(day);

            if (x.getDayOfMonth() === dayOfMonth) {
                let workDay = MyDate.workDay(now, day);
                if (!this.weekService.selectedDay) {
                    this.weekService.selectedDay = workDay;
                }

                return workDay;
            }
        }

        return MyDate.simpleDay(now);
    }
}

import { MyDate } from '../myDate';

export class WorkDayRB {
    public year: number;
    public month: number;
    public day: number;
    public requiredHours: number;

    constructor(date: MyDate, requiredHours: number) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.requiredHours = requiredHours;
    }
}

import { MyDate } from '../myDate';

export class ModifyWorkDayRB {
    public year: number;
    public month: number;
    public day: number;
    public requiredMinutes: number;

    constructor(date: MyDate, requiredMinutes: number) {
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDay();
        this.requiredMinutes = requiredMinutes;
    }
}

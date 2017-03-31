import { WorkDay } from './backend/workDay';
enum DayType { Empty, Simple, Work }

const SUNDAY = 0;
const SATURDAY = 6;

export class MyDate {
  public type: DayType;
  public date: Date;
  public requiredWorkMinutes: number;
  public minutes: number;
  public extraMinutes: number;

  public static simpleDay(date: Date): MyDate {
    return new MyDate(DayType.Simple, date);
  }

  public static workDay(date: Date, workDay: WorkDay): MyDate {
    return new MyDate(DayType.Work, date, workDay.requiredMinPerDay, workDay.sumMinPerDay, workDay.extraMinPerDay);
  }

  constructor(type: DayType = DayType.Empty, date = new Date(), requiredWorkMinutes = 0, minutes = 0, extraMinutes = 0) {
    this.type = type;
    this.date = date;
    this.requiredWorkMinutes = requiredWorkMinutes;
    this.minutes = minutes;
    this.extraMinutes = extraMinutes;
  }

  public makeWorkDay(workDay: WorkDay) {
    this.type = DayType.Work;
    this.requiredWorkMinutes = workDay.requiredMinPerDay;
    this.extraMinutes = workDay.extraMinPerDay;
    this.minutes = workDay.sumMinPerDay;
  }

  public getYear(): number {
    return this.date.getFullYear();
  }

  public getMonth(): number {
    return this.date.getMonth() + 1;
  }

  public getDay(): number {
    return this.date.getDate();
  }

  public isWeekend(): boolean {
    return this.date.getDay() === SUNDAY || this.date.getDay() === SATURDAY;
  }

  public isSimpleDay(): boolean {
    return this.type === DayType.Simple;
  }

  public isWorkDay(): boolean {
    return this.type === DayType.Work;
  }
}

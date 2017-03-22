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

  public static workDay(date: Date, requiredWorkingMinutes: number, minutes: number, extraMinutes: number): MyDate {
    return new MyDate(DayType.Work, date, requiredWorkingMinutes, minutes, extraMinutes);
  }

  constructor(type: DayType = DayType.Empty, date = new Date(), requiredWorkMinutes = 0, minutes = 0, extraMinutes = 0) {
    this.type = type;
    this.date = date;
    this.requiredWorkMinutes = requiredWorkMinutes;
    this.minutes = minutes;
    this.extraMinutes = extraMinutes;
  }

  public makeWorkDay() {
    this.type = DayType.Work;
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
    return this.date.getDate() === SUNDAY || this.date.getDate() === SATURDAY;
  }

  public isSimpleDay(): boolean {
    return this.type === DayType.Simple;
  }

  public isWorkDay(): boolean {
    return this.type === DayType.Work;
  }
}

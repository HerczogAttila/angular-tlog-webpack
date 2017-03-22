import { MyDate } from './myDate';

const DAYS_IN_WEEK = 7;

export class Week {
  public days: MyDate[];

  constructor(days: MyDate[] = []) {
    this.days = days;
  }

  public isFull(): boolean {
    return this.days.length === DAYS_IN_WEEK;
  }
}

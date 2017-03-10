export enum DayType { Empty, Simple, Work }

export class MyDate {
  type: DayType;
  year: number;
  month: number;
  day: number;
  requiredWorkMinutes = 0;
  minutes = 0;
  extraMinutes = 0;
  weekend = false;

  isSimpleDay() {
    return this.type === DayType.Simple;
  }
  isWorkDay() {
    return this.type === DayType.Work;
  }
}

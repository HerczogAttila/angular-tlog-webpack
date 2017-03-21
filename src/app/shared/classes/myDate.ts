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

  public isSimpleDay(): boolean {
    return this.type === DayType.Simple;
  }

  public isWorkDay(): boolean {
    return this.type === DayType.Work;
  }

  public getExtraMinutesColor(): string {
    return (this.extraMinutes >= 0) ? 'green' : 'red';
  }
}

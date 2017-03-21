export class WorkDay {
    requiredMinPerDay: number;
    extraMinPerDay: number;
    sumMinPerDay: number;
    date: string;

    public getDayOfMonth(): number {
        let fields = this.date.split('.');
        if (fields.length >= 3) {
            return +fields[2];
        }
        return 0;
    }
}

export class WorkDay {
    public requiredMinPerDay: number;
    public extraMinPerDay: number;
    public sumMinPerDay: number;
    public date: string;

    public getDayOfMonth(): number {
        let fields = this.date.split('.');
        if (fields.length >= 3) {
            return +fields[2];
        }
        return 0;
    }
}

export class LocalTime {
    hour: number;
    minute: number;

    public toString(): string {
        return this.hour + ':' + this.minute;
    }
}

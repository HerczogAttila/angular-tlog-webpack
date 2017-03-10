import { LocalTime } from './localTime';

export class Task {
    taskId: string;
    comment: string;
    sumMinPerDay: number;
    startTime: LocalTime;
    endTime: LocalTime;
}

import { LocalDate } from './localDate';

export class WorkDay {
    requiredMinPerDay: number;
    extraMinPerDay: number;
    sumMinPerDay: number;
    actualDay: LocalDate;
}
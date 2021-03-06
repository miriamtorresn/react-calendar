import { IScheduleEvent } from "../interfaces/ISchedule";

export interface IMonthDay {
    date: IDate;
    isWeekend: boolean;
    isToday: boolean;
    month?: string;
    events?: IScheduleEvent[];
};

export interface IDate {
    month: number;
    day: number;
    year: number;
    date: Date;
};

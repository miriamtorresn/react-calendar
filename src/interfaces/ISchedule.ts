import { IDate } from "./IDates";

export interface IScheduleEvent {
    time: number;
    name: string;
    description: string;
    attendees: string[];
    date: IDate;
};
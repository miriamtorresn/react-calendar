import { IDate } from "./IDates";

export interface IScheduleEvent {
    id: number;
    time: number;
    name: string;
    description: string;
    attendees: string[];
    date: IDate;
};
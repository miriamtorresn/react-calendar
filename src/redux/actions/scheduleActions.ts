import * as types from "./actionTypes";
import api from "../../utils/api";
import { updateLoadingStatus } from "./loadingActions";
import { IMonthDay } from "../../interfaces/IDates";
import { IScheduleEvent } from "../../interfaces/ISchedule";
import { getCalendarDays, getDateDetails } from "../../utils/calendarHandler";

export function setCalendar(calendarDays: IMonthDay[]) {
  return { type: types.SET_CALENDAR, calendarDays };
}

export function addMeeting(meeting: IScheduleEvent) {
  return { type: types.ADD_SCHEDULE_EVENT, meeting };
}

export function loadCalendar(userID: number) {
  return (dispatch: any) => {
    dispatch(updateLoadingStatus(true));
    const calendarDays = getCalendarDays();
    return api.get(`schedule/${userID}`)
      .then(res => {
        const scheduleEvents = res.data.schedule.map((event: IScheduleEvent) => {
          event.date = getDateDetails(new Date(event.time * 1000));
          return event;
        });
        const updatedData = calendarDays.map(day => {
          const dayEvents = scheduleEvents.filter((event: IScheduleEvent) => event.date.day === day.date.day);
          day.events = dayEvents;
          return day;
        });
        dispatch(setCalendar(updatedData));
        dispatch(updateLoadingStatus(false));
      });
  };
}

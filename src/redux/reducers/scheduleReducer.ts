import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { IScheduleEvent } from '../../interfaces/ISchedule';
import { IMonthDay } from "../../interfaces/IDates";

interface IScheduleReducer {
  type: string;
  schedule?: IScheduleEvent[];
  loading?: boolean;
  calendarDays?: IMonthDay[];
  meeting?: IScheduleEvent;
}

export default function scheduleReducer(state = initialState.scheduleReducer, action: IScheduleReducer) {
  switch (action.type) {
    // Updating calendar
      case types.SET_CALENDAR:
        if (state.calendarDays.length <= 0) {
          return {
            ...state,
            calendarDays: action.calendarDays
          };
        } else {
          return state;
        }
        
    // Updating loading status
    case types.UPDATE_LOADING_STATUS:
      return {
        ...state,
        loading: action.loading
      };
    // Add schedule event
    case types.ADD_SCHEDULE_EVENT:
      if (action && action.meeting) {
        const meeting: IScheduleEvent = action.meeting;
        const newCalendarDays = state.calendarDays.map((_day: IMonthDay) => {
          const newDay = {..._day};
          if ((newDay.date.day === meeting.date.day)) {
            const events = newDay.events ? newDay.events : [];
            newDay.events = [...events, meeting];
          }
          return newDay;
        });
        return {
          ...state,
          calendarDays: newCalendarDays
        };
      } else {
        return state;
      }
    case types.UPDATE_EDIT_MEETING:
      return {
        ...state,
        editMeeting: action.meeting
      };
    // Default return of state
    default:
      return state;
  }
}


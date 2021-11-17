import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { IScheduleEvent } from '../../interfaces/ISchedule';
import { IMonthDay } from "../../interfaces/IDates";

interface IScheduleReducer {
  type: string;
  schedule?: IScheduleEvent[];
  loading?: boolean;
  calendarDays?: IMonthDay[];
}

export default function scheduleReducer(state = initialState.scheduleReducer, action: IScheduleReducer) {
  switch (action.type) {
    // Updating calendar
      case types.SET_CALENDAR:
        return {
          ...state,
          calendarDays: action.calendarDays
        };
    // Updating loading status
    case types.UPDATE_LOADING_STATUS:
      return {
        ...state,
        loading: action.loading
      };
    // Default return of state
    default:
      return state;
  }
}


import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { IScheduleEvent } from '../../interfaces/ISchedule';

interface IScheduleReducer {
  type: string;
  schedule?: IScheduleEvent[];
  loading?: boolean;
}

export default function scheduleReducer(state = initialState.scheduleReducer, action: IScheduleReducer) {
  switch (action.type) {
    // Updating schedule
    case types.SET_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule
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


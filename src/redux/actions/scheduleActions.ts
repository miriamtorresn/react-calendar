import * as types from "./actionTypes";
import api from "../../utils/api";
import { updateLoadingStatus } from "./loadingActions";

export function setSchedule(loading: boolean) {
  return { type: types.SET_SCHEDULE, loading };
}

export function loadSchedule(userID: string) {
  return (dispatch: any) => {
    dispatch(updateLoadingStatus(true));
    return api.get(`schedule/${userID}`)
      .then(res => {
        dispatch(setSchedule(res.data.data));
        dispatch(updateLoadingStatus(false));
      });
  };
}

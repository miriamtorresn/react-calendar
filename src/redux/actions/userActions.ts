import * as types from "./actionTypes";
import api from "../../utils/api";
import { IUser, IUserLoginRequest } from '../../interfaces/IUser';
import { updateLoadingStatus } from "./loadingActions";

export function updateUserInformation(user: IUser) {
  return { type: types.SET_USER, user };
}

export function login(request: IUserLoginRequest) {
  return (dispatch: any) => {
    dispatch(updateLoadingStatus(true));
    return api.post('user/login', request)
      .then(res => {
        dispatch(updateUserInformation(res.data.data));
        dispatch(updateLoadingStatus(false));
      });
  };
}

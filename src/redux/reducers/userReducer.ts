import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { IUser } from "../../interfaces/IUser";

interface IUserReducer {
    type: string;
    user: IUser
};

export default function userReducer(state = initialState.userReducer, action: IUserReducer) {
  switch (action.type) {
    // Updating user information
    case types.SET_USER:
      return {
        ...state,
        user: action.user
      }
    // Default return of state
    default:
      return state;
  }
}


import { combineReducers } from "redux";
import userReducer from "./userReducer";
import scheduleReducer from "./scheduleReducer";

const rootReducer = combineReducers({
  userReducer,
  scheduleReducer
});

export default rootReducer;

import { combineReducers } from "redux";

import ImageReducer from "./imageReducer";
import StatsReducer from "./statsReducer";

export default combineReducers({
  ImageReducer,
  StatsReducer
});

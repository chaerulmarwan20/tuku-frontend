import { combineReducers } from "redux";
import orderReducer from "./order";
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer
});

export default rootReducer;

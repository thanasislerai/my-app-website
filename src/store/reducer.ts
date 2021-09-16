import { combineReducers } from "redux";

import theme from "./theme/slice";
import user from "./user/slice";

const appReducer = combineReducers({
  theme,
  user,
});

export default appReducer;

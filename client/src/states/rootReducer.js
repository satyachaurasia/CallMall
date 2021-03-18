import userReducer from "./user/user.reducer";
import { combineReducers } from "redux";

import userTypes from "./user/user.types";

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === userTypes.SIGN_OUT) {
    localStorage.removeItem("token");
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from "redux";
import auth from "./auth/reducers";
import locationReducer from "./location/reducer";
import globalReducer from "./Global/reducer";

const reducer = combineReducers({
  auth,
  locationReducer,
  globalReducer,
});

export default reducer;

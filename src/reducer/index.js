import { combineReducers } from "redux";

import DashboardReducer from './dashboard';

const rootReducer = combineReducers({
  dashboard: DashboardReducer
});

export default rootReducer;
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../reducer";

const enhancer = compose(
  applyMiddleware(thunk),
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : null
);
const store = createStore(Reducer, enhancer);

export default store;
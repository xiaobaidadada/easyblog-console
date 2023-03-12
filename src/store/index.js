// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./modules/index";

// const reducer = combineReducers({
//   ...reducers,
// });
// const store = createStore(reducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    ...reducers,
  },
});
export default store;

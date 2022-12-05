import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import { service } from "../services/service";
import common from "./reducers/commonSlice";


const rootReducer = combineReducers({
  common,
  [service.reducerPath]: service.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      service.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
// import cReducer from "../../features/counter/counterSlice";
import { service } from "../services/service";
import common from "./reducers/commonSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

const rootReducer = combineReducers({
  common,
  [service.reducerPath]: service.reducer,
  // [logs.reducerPath]: logs.reducer,
  // [licenseManager.reducerPath]: licenseManager.reducer,
  // [licensesService.reducerPath]: licensesService.reducer,
  // [packagesService.reducerPath]: packagesService.reducer,
  // [userService.reducerPath]: userService.reducer,
  // [settingsService.reducerPath]: settingsService.reducer,
  // [authService.reducerPath]: authService.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      service.middleware
      //     // logs.middleware,
      //     // licenseManager.middleware,
      //     // licensesService.middleware,
      //     // packagesService.middleware,
      //     // userService.middleware,
      //     // settingsService.middleware,
      //     // authService.middleware
      //   ),
    ),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// // export type AppThunk<ReturnType = void> = ThunkAction<
// //   ReturnType,
// //   RootState,
// //   unknown,
// //   Action<string>
// // >;
  
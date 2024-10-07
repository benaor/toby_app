import { Dependencies } from "@app/dependencies/Dependencies.type";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({});

export const createStore = (config: {
  initialState?: AppState;
  dependencies: Dependencies;
}) =>
  configureStore({
    preloadedState: config?.initialState,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
      });
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

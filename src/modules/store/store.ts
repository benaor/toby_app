import { Dependencies } from "@app/dependencies/Dependencies.type";
import { archivesReducer } from "@events/core/slices/archives.slices";
import { creationReducer } from "@events/core/slices/creation.slice";
import { eventsReducer } from "@events/core/slices/event.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  events: eventsReducer,
  archives: archivesReducer,
  creation: creationReducer,
});

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

import { creationActions } from "../slices/creation.slice";
import { AppDispatch, AppListenerMiddlewareInstance } from "@store/store";
import { fetchSearchedGuests } from "../usecases/searchGuests.usecase";
import { createEvent } from "../usecases/createEvent.usecase";
import { fetchEventsList } from "../usecases/fetchEvent.usecase";

export const eventCreationListener = (
  listener: AppListenerMiddlewareInstance,
) => {
  listener.startListening({
    actionCreator: creationActions.setSearchField,
    effect: async (action, { dispatch, delay }) => {
      const field = action.payload;

      delay(1000);
      if (field.length > 3) {
        await (dispatch as AppDispatch)(fetchSearchedGuests(field)); // TODO Find solution to avoid the cast here
      }
    },
  });

  listener.startListening({
    actionCreator: createEvent.fulfilled,
    effect: async (_, { dispatch }) => {
      (dispatch as AppDispatch)(fetchEventsList());
    },
  });
};

import { creationActions } from "../slices/creation.slice";
import { AppDispatch, AppListenerMiddlewareInstance } from "@store/store";
import { fetchSearchedGuests } from "../usecases/searchGuests.usecase";

export const searchGuestListener = (
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
};

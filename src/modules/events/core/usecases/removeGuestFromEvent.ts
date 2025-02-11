import { createAppAsyncThunk } from "@store/thunk";
import { eventsActions } from "../slices/event.slice";

type Parameters = {
  eventId: Identifier;
  guestId: Identifier;
};

export const removeGuestFromEvent = createAppAsyncThunk(
  "events/removeGuestFromEvent",
  async ({ eventId, guestId }: Parameters, { dispatch, getState, extra }) => {
    const guestToRemove = getState().events.entities[eventId]?.guests.find(
      (guest) => guest.id === guestId,
    );

    if (!guestToRemove) return;

    dispatch(eventsActions.removeGuest({ eventId, guestId }));

    try {
      await extra.eventRepository.removeGuestFromEvent(eventId, guestId);
    } catch (e) {
      dispatch(eventsActions.addGuest({ eventId, guest: guestToRemove }));

      throw e;
    }
  },
);

import { createAppAsyncThunk } from "@store/thunk";
import { eventsActions } from "../slices/event.slice";

export const acceptInvitation = createAppAsyncThunk(
  "events/acceptInvitation",
  async function (eventId: Identifier, { dispatch, getState, extra }) {
    const initialValue =
      getState().events.entities[eventId]?.invitationAccepted;

    dispatch(eventsActions.acceptInvitation(eventId)); // optimistic update

    try {
      await extra.eventRepository.acceptInvitation(eventId);
    } catch (e) {
      dispatch(eventsActions.resetInvitation({ eventId, initialValue })); // revert optimistic update

      throw e;
    }
  },
  {
    condition: (eventId, { getState }) => {
      const event = getState().events.entities[eventId];
      return event && !event.invitationAccepted;
    },
  },
);

import { createAppAsyncThunk } from "@store/thunk";
import { eventsActions } from "../slices/event.slice";

export const declineInvitation = createAppAsyncThunk(
  "events/declineInvitation",
  async function (eventId: Identifier, { dispatch, getState, extra }) {
    const initialValue =
      getState().events.entities[eventId]?.invitationAccepted;

    dispatch(eventsActions.declineInvitation(eventId)); // optimistic update

    try {
      await extra.eventRepository.declineInvitation(eventId);
    } catch (e) {
      dispatch(eventsActions.resetInvitation({ eventId, initialValue })); // revert optimistic update

      throw e;
    }
  },
  {
    condition: (eventId, { getState }) => {
      const event = getState().events.entities[eventId];
      return event && event.invitationAccepted !== false;
    },
  },
);

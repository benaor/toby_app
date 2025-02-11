import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchEventsList } from "../usecases/fetchEvent.usecase";
import { UserEvent } from "../models/Event.model";
import { Guest } from "../models/Guest.model";

type State = {
  status: "idle" | "loading" | "error";
  error: string | null;
};

const eventsAdapters = createEntityAdapter<UserEvent>();
export const eventsInitialState = eventsAdapters.getInitialState<State>({
  status: "idle",
  error: "",
});

const eventSlice = createSlice({
  name: "event",
  initialState: eventsInitialState,
  reducers: {
    acceptInvitation: (state, action: PayloadAction<Identifier>) => {
      eventsAdapters.updateOne(state, {
        id: action.payload,
        changes: {
          invitationAccepted: true,
        },
      });
    },
    declineInvitation: (state, action: PayloadAction<Identifier>) => {
      eventsAdapters.updateOne(state, {
        id: action.payload,
        changes: {
          invitationAccepted: false,
        },
      });
    },
    resetInvitation: (
      state,
      action: PayloadAction<{
        eventId: Identifier;
        initialValue: UserEvent["invitationAccepted"];
      }>,
    ) => {
      eventsAdapters.updateOne(state, {
        id: action.payload.eventId,
        changes: {
          invitationAccepted: action.payload.initialValue,
        },
      });
    },
    removeGuest: (
      state,
      action: PayloadAction<{ eventId: Identifier; guestId: Identifier }>,
    ) => {
      eventsAdapters.updateOne(state, {
        id: action.payload.eventId,
        changes: {
          guests: state.entities[action.payload.eventId]?.guests.filter(
            (guest) => guest.id !== action.payload.guestId,
          ),
        },
      });
    },
    addGuest: (
      state,
      action: PayloadAction<{ eventId: Identifier; guest: Guest }>,
    ) => {
      eventsAdapters.updateOne(state, {
        id: action.payload.eventId,
        changes: {
          guests: [
            ...(state.entities[action.payload.eventId]?.guests ?? []),
            action.payload.guest,
          ],
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventsList.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        eventsAdapters.setAll(state, action.payload);
      })
      .addCase(fetchEventsList.rejected, (state, action) => {
        state.status = "error";
        eventsAdapters.removeAll(state);
        state.error = action.error.message || "Une erreur est survenue";
      });
  },
});

export type EventState = typeof eventsInitialState;

export const eventsSelectors = eventsAdapters.getSelectors();
export const eventsReducer = eventSlice.reducer;
export const eventsActions = eventSlice.actions;

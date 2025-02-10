import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchEventsList } from "../usecases/fetchEvent.usecase";
import { UserEvent } from "../models/Event.model";

type State = {
  status: "idle" | "loading" | "error";
  error: string | null;
};

const eventsAdapters = createEntityAdapter<UserEvent>();
const initialState = eventsAdapters.getInitialState<State>({
  status: "idle",
  error: "",
});

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
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

export type EventState = typeof initialState;

export const eventsSelectors = eventsAdapters.getSelectors();
export const eventsReducer = eventSlice.reducer;
export const eventsActions = eventSlice.actions;

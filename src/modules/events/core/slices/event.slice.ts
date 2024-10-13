import { createSlice } from "@reduxjs/toolkit";
import { EventList } from "../models/EventList.model";

type EventState = {
  eventsList: EventList;
};

const initialState: EventState = {
  eventsList: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    storeEventsList: (state, action) => {
      state.eventsList.push(...action.payload);
    },
  },
});

export const eventsReducer = eventSlice.reducer;
export const eventsActions = eventSlice.actions;

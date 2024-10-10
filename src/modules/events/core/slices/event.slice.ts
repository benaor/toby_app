import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsList: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    storeEventsList: (state, action) => {
      state.eventsList = action.payload;
    },
  },
});

export const eventsReducer = eventSlice.reducer;
export const eventsActions = eventSlice.actions;

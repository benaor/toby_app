import { createSlice } from "@reduxjs/toolkit";
import { EventList } from "../models/EventList.model";
import { fetchEventsList } from "../usecases/fetchEvent.usecase";

type EventState = {
  eventsList: {
    data: EventList;
    status: "idle" | "loading" | "error";
    error: string | null;
  };
};

const initialState: EventState = {
  eventsList: {
    data: [],
    status: "idle",
    error: "",
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventsList.pending, (state) => {
      state.eventsList.status = "loading";
    });
    builder.addCase(fetchEventsList.fulfilled, (state, action) => {
      state.eventsList.status = "idle";
      state.eventsList.data = action.payload;
    });
    builder.addCase(fetchEventsList.rejected, (state, action) => {
      state.eventsList.status = "error";
      state.eventsList.data = [];
      state.eventsList.error = action.error.message || null;
    });
  },
});

export const eventsReducer = eventSlice.reducer;
export const eventsActions = eventSlice.actions;

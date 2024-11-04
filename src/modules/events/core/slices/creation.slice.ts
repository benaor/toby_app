import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EventForm,
  EventFormAdditionalsInfos,
  EventFormGeneralsInfos,
  EventType,
  CreationStep,
} from "../models/EventForm.model";
import { Guest } from "../models/Guest.model";
import { fetchSearchedGuests } from "../usecases/searchGuests.usecase";

type State = {
  step: CreationStep;
  form: Nullable<EventForm>;
  searchGuests: {
    field: string;
    guests: Guest[];
    status: "idle" | "pending" | "error";
  };
};

const initialState: State = {
  step: CreationStep.ChooseEvent,
  form: {
    type: null,
    title: null,
    description: null,
    image: null,
    location: null,
    date: null,
  },
  searchGuests: {
    field: "",
    guests: [],
    status: "idle",
  },
};

const creationSlice = createSlice({
  name: "event/creation",
  initialState,
  reducers: {
    chooseType: (state, action: PayloadAction<EventType>) => {
      state.form.type = action.payload;
      state.step = CreationStep.EventInformations;
    },
    setGeneralsInfos: (
      state,
      action: PayloadAction<EventFormGeneralsInfos>,
    ) => {
      state.form = { ...state.form, ...action.payload };
      state.step = CreationStep.EventAdditionalInfos;
    },
    setAdditionalsInfos: (
      state,
      action: PayloadAction<EventFormAdditionalsInfos>,
    ) => {
      state.form.location = action.payload.location;
      state.form.date = action.payload.date;
      state.step = CreationStep.AddGuestsToEvent;
    },
    setSearchField: (state, action: PayloadAction<string>) => {
      state.searchGuests.field = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedGuests.fulfilled, (state, action) => {
        state.searchGuests.guests = action.payload;
        state.searchGuests.status = "idle";
      })
      .addCase(fetchSearchedGuests.pending, (state) => {
        state.searchGuests.status = "pending";
      });
  },
});

export const creationReducer = creationSlice.reducer;
export const creationActions = creationSlice.actions;

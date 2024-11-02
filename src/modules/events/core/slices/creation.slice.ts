import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EventForm,
  EventFormAdditionalsInfos,
  EventFormGeneralsInfos,
  EventType,
  CreationStep,
} from "../models/EventForm.model";

type State = {
  step: CreationStep;
  form: Nullable<EventForm>;
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
  },
});

export const creationReducer = creationSlice.reducer;
export const creationActions = creationSlice.actions;

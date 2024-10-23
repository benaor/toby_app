import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreationStep } from "../models/Creation.model";
import {
  EventForm,
  EventFormGeneralsInfos,
  EventType,
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
  },
};

const creationSlice = createSlice({
  name: "creation",
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
  },
});

export const creationReducer = creationSlice.reducer;
export const creationActions = creationSlice.actions;

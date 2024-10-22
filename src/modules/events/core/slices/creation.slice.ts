import { createSlice } from "@reduxjs/toolkit";
import { CreationStep } from "../models/Creation.model";
import { EventForm } from "../models/EventForm.model";

type State = {
  step: CreationStep;
  form: EventForm;
};

const initialState: State = {
  step: CreationStep.ChooseEvent,
  form: {
    type: null,
  },
};

const creationSlice = createSlice({
  name: "creation",
  initialState,
  reducers: {
    chooseType: (state, action) => {
      state.form.type = action.payload;
      state.step = CreationStep.EventInformations;
    },
  },
});

export const creationReducer = creationSlice.reducer;
export const creationActions = creationSlice.actions;

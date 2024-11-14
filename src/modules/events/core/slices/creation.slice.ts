import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EventForm,
  EventFormAdditionalsInfos,
  EventFormGeneralsInfos,
  EventType,
  CreationStep,
  EventFormModules,
} from "../models/EventForm.model";
import { Guest } from "../models/Guest.model";
import { fetchSearchedGuests } from "../usecases/searchGuests.usecase";

export type CreationState = {
  step: CreationStep;
  form: Nullable<EventForm> & EventFormModules;
  searchGuests: {
    field: string;
    guests: Guest[];
    status: "idle" | "pending" | "error";
    error: string | null;
  };
};

export const initialCreationState: CreationState = {
  step: CreationStep.ChooseEvent,
  form: {
    type: null,
    title: null,
    description: null,
    image: null,
    location: null,
    date: null,
    guests: [],
    modules: {
      location: false,
      activity: false,
      budget: false,
      cagnotte: false,
    },
  },
  searchGuests: {
    field: "",
    guests: [],
    status: "idle",
    error: null,
  },
};

const creationSlice = createSlice({
  name: "event/creation",
  initialState: initialCreationState,
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
    addGuestToForm: (state, action: PayloadAction<Identifier>) => {
      const isAlreadyInForm = state.form.guests?.includes(action.payload);

      if (isAlreadyInForm) return;

      state.form.guests?.push(action.payload);
    },
    validateGuestsStep: (state) => {
      state.step = CreationStep.AddEventModules;
    },
    toggleLocationModule: (state) => {
      state.form.modules.location = !state.form.modules.location;
    },
    toggleCagnotteModule: (state) => {
      state.form.modules.cagnotte = !state.form.modules.cagnotte;
    },
    toggleBudgetModule: (state) => {
      state.form.modules.budget = !state.form.modules.budget;
    },
    toggleActivityModule: (state) => {
      state.form.modules.activity = !state.form.modules.activity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedGuests.fulfilled, (state, action) => {
        state.searchGuests.guests = action.payload;
        state.searchGuests.status = "idle";
        state.searchGuests.error = null;
      })
      .addCase(fetchSearchedGuests.pending, (state) => {
        state.searchGuests.status = "pending";
      })
      .addCase(fetchSearchedGuests.rejected, (state, { error }) => {
        state.searchGuests.guests = [];
        state.searchGuests.status = "error";
        state.searchGuests.error = error.message!;
      });
  },
});

export const creationReducer = creationSlice.reducer;
export const creationActions = creationSlice.actions;

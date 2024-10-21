import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchArchivedEventsList } from "../usecases/fetchArchivedEvents.usecase";
import { ArchivedEvent } from "../models/Event.model";

type State = {
  status: "idle" | "loading" | "error";
  error: string | null;
};

const archivesAdapter = createEntityAdapter<ArchivedEvent>();
const initialState = archivesAdapter.getInitialState<State>({
  status: "idle",
  error: null,
});

const archivesSlice = createSlice({
  name: "archives",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchivedEventsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArchivedEventsList.rejected, (state, action) => {
        archivesAdapter.removeAll(state);
        state.status = "error";
        state.error = action.error.message || "Une erreur est survenue";
      })
      .addCase(fetchArchivedEventsList.fulfilled, (state, action) => {
        archivesAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.error = null;
      });
  },
});

export type ArchivesState = typeof initialState;

export const archivesSelectors = archivesAdapter.getSelectors();
export const archivesReducer = archivesSlice.reducer;

import { createAppAsyncThunk } from "@store/thunk";

export const fetchArchivedEventsList = createAppAsyncThunk(
  "archives/fetchArchivedEventsList",
  async (_, { extra }) => await extra.eventRepository.getAllArchivedEvents(),
);

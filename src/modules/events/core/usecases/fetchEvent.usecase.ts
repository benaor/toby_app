import { createAppAsyncThunk } from "@store/thunk";

export const fetchEventsList = createAppAsyncThunk(
  "events/fetchEventsList",
  async (_, { extra }) => await extra.eventRepository.getAllMyEvents(),
);

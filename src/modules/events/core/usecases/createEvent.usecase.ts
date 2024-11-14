import { createAppAsyncThunk } from "@store/thunk";

export const createEvent = createAppAsyncThunk(
  "event/create",
  async (_, { getState, extra }) =>
    extra.eventRepository.createEvent(getState().creation.form),
);

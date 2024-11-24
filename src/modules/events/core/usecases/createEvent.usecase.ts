import { createAppAsyncThunk } from "@store/thunk";
import { EventCreationForm } from "../models/EventForm.model";

export const createEvent = createAppAsyncThunk(
  "event/create",
  async (_, { getState, extra }) => {
    const event = getState().creation.form;

    // if (event.type === null) throw new Error("Event type is required");

    await extra.eventRepository.createEvent(event as EventCreationForm);
  },
);

import { createAppAsyncThunk } from "@store/thunk";
import { EventCreationForm, EventForm } from "../models/EventForm.model";

export const createEvent = createAppAsyncThunk(
  "event/create",
  async (_, { getState, extra }) => {
    const eventForm = getState().creation.form;

    // istanbul ignore next - This validation never return false because throw an error instead
    if (isValidEventCreationForm(eventForm))
      return await extra.eventRepository.createEvent(eventForm);
  },
);

const isValidEventCreationForm = (
  event: EventForm,
): event is EventCreationForm => {
  if (event.type === null) throw new Error("Event type is required");
  if (event.title === null) throw new Error("Title is required");
  if (event.description === null) throw new Error("Description is required");
  if (event.image === null) throw new Error("Image is required");
  if (event.date.start === null) throw new Error("Start date is required");
  if (event.location.address === null) throw new Error("Location is required");
  if (event.location.name === null) throw new Error("Location is required");

  return true;
};

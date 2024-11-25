import { createAppAsyncThunk } from "@store/thunk";
import { EventCreationForm, EventForm } from "../models/EventForm.model";

export const createEvent = createAppAsyncThunk(
  "event/create",
  async (_, { getState, extra }) => {
    const eventForm = getState().creation.form;
    const eventCreationForm = eventFormToCreationForm(eventForm);

    await extra.eventRepository.createEvent(eventCreationForm);
  },
);

const eventFormToCreationForm = (event: EventForm): EventCreationForm => {
  if (event.type === null) throw new Error("Event type is required");
  if (event.title === null) throw new Error("Title is required");
  if (event.description === null) throw new Error("Description is required");
  if (event.image === null) throw new Error("Image is required");
  if (event.date === null) throw new Error("Date is required");
  if (event.guests === null) throw new Error("Guests is required");
  if (event.location === null) throw new Error("Location is required");

  return {
    type: event.type,
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location,
    date: event.date,
    guests: event.guests,
    modules: event.modules,
  };
};

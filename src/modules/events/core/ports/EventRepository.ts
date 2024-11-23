import {
  ArchivedEventList,
  EventList,
  Event,
} from "@events/core/models/Event.model";
import { EventCreationForm } from "../models/EventForm.model";

export interface EventRepository {
  getAllMyEvents: () => Promise<EventList>;
  getAllArchivedEvents: () => Promise<ArchivedEventList>;
  createEvent: (form: EventCreationForm) => Promise<Event>;
}

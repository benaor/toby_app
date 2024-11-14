import {
  ArchivedEventList,
  Event,
  EventList,
} from "@events/core/models/Event.model";
import { EventForm } from "../models/EventForm.model";

export interface EventRepository {
  getAllMyEvents: () => Promise<EventList>;
  getAllArchivedEvents: () => Promise<ArchivedEventList>;
  createEvent: (form: EventForm) => Promise<Event>;
}

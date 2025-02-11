import {
  ArchivedEventList,
  EventList,
  Event,
} from "@events/core/models/Event.model";
import { EventCreationForm } from "../models/EventForm.model";

export interface EventRepository {
  // Queries
  getAllMyEvents: () => Promise<EventList>;
  getAllArchivedEvents: () => Promise<ArchivedEventList>;

  // Commands
  createEvent: (form: EventCreationForm) => Promise<Event>;
  acceptInvitation: (eventId: Identifier) => Promise<void>;
  declineInvitation: (eventId: Identifier) => Promise<void>;
}

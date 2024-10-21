import { ArchivedEventList, EventList } from "@events/core/models/Event.model";

export interface EventRepository {
  getAllMyEvents: () => Promise<EventList>;
  getAllArchivedEvents: () => Promise<ArchivedEventList>;
}

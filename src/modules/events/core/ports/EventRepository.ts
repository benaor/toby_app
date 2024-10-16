import { EventList } from "@events/core/models/EventList.model";

export interface EventRepository {
  getAllMyEvents: () => Promise<EventList>;
}

import { EventList } from "../models/Event.model";
import { EventRepository } from "../ports/EventRepository";

export class StubEventRepository implements EventRepository {
  constructor(private events: EventList = []) {}

  getAllMyEvents: () => Promise<EventList> = async () => {
    return Promise.resolve(this.events);
  };
}

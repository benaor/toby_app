import { EventList } from "../models/EventList.model";
import { EventRepository } from "../ports/EventRepository";

export class StubEventRepository implements EventRepository {
  constructor(private events: EventList = []) {}

  getAllMyEvent: () => Promise<EventList> = async () => {
    return Promise.resolve(this.events);
  };
}

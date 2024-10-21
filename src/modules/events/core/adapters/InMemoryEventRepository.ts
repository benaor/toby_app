import { EventFactory } from "../models/Event.factory";
import { EventList } from "../models/Event.model";
import { EventRepository } from "../ports/EventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: EventList = [
    EventFactory.EVENT({
      id: "1",
      title: "Anniv. Benjamin",
    }),
    EventFactory.EVENT({
      id: "2",
      title: "Soirée de l'été",
    }),
  ];

  getAllMyEvents = async () => {
    return Promise.resolve(this.events);
  };
}

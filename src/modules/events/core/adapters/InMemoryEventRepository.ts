import { EventFactory } from "../models/Event.factory";
import { EventList } from "../models/EventList.model";
import { EventRepository } from "../ports/EventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: EventList = [
    EventFactory.EventListItem({
      id: "1",
      title: "Anniversaire de Benjamin",
    }),
    EventFactory.EventListItem({
      id: "2",
      title: "Soirée de l'été",
    }),
  ];

  getAllMyEvents = async () => {
    return Promise.resolve(this.events);
  };
}

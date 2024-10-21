import { EventFactory } from "../models/Event.factory";
import { ArchivedEventList, EventList } from "../models/Event.model";
import { EventRepository } from "../ports/EventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: EventList = [
    EventFactory.EVENT({
      id: "1",
      title: "Anniv. Benjamin",
      start: "2021-12-24",
    }),
    EventFactory.EVENT({
      id: "2",
      title: "Soirée de l'été",
      start: "2021-07-01",
    }),
    EventFactory.EVENT({
      id: "3",
      title: "Team building",
      start: "2021-09-01",
      end: "2021-09-02",
    }),
    EventFactory.EVENT({
      id: "4",
      title: "Fête de Thomas",
      start: "2021-08-03",
      end: null,
    }),
    EventFactory.EVENT({
      id: "5",
      title: "Vacances Suisse",
      start: "2021-08-03",
      end: "2021-08-12",
    }),
  ];

  private archivedEvents: ArchivedEventList = [
    EventFactory.EVENT({
      id: "60",
      title: "Nouvel an",
      start: "2020-01-01",
    }),
    EventFactory.EVENT({
      id: "70",
      title: "Caca chez Paul",
      start: "2020-07-01",
    }),
    EventFactory.EVENT({
      id: "80",
      title: "Team building",
      start: "2020-09-01",
      end: "2020-09-02",
    }),
  ];

  getAllMyEvents = async () => {
    return Promise.resolve(this.events);
  };

  getAllArchivedEvents = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve(this.archivedEvents);
  };
}

import { ArchivedEvent, Event } from "./Event.model";

export class EventFactory {
  static EVENT = (item: Partial<Event>): Event => {
    return {
      id: "1",
      guests: ["John", "Doe"],
      image: "https://picsum.photos/seed/picsum/200/300",
      isAdmin: false,
      notification: {
        count: 0,
      },
      title: "Event 1 from factory",
      start: new Date("2020-01-01").toISOString(),
      end: null,
      ...item,
    };
  };

  static ARCHIVED_EVENT = (item: Partial<ArchivedEvent>): ArchivedEvent => {
    return {
      id: "1",
      guests: ["Me"],
      image: "https://picsum.photos/seed/picsum/200/300",
      isAdmin: false,
      notification: {
        count: 0,
      },
      title: "Event 1 from factory",
      start: "2020-01-01",
      end: null,
      ...item,
    };
  };
}

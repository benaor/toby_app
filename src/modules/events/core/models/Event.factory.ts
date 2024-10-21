import { Event } from "./Event.model";

export class EventFactory {
  static EVENT = (item: Partial<Event>): Event => {
    return {
      id: "1",
      guests: [],
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
}

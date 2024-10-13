import { eventListItem } from "./EventList.model";

export class EventFactory {
  static EventListItem = (item: Partial<eventListItem>): eventListItem => {
    return {
      id: "1",
      guests: [],
      image: "www.stub.com/image/1",
      isAdmin: false,
      notification: {
        count: 0,
      },
      title: "Event 1 from factory",
      date: new Date("2020-01-01").toISOString(),
      ...item,
    };
  };
}

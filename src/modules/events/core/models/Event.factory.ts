import { ArchivedEvent, UserEvent } from "./Event.model";
import { GuestFactory } from "./Guest.factory";

export class EventFactory {
  static USER_EVENT = (item?: Partial<UserEvent>): UserEvent => {
    return {
      id: "1",
      guests: [
        GuestFactory.GUEST({ id: "john" }),
        GuestFactory.GUEST({ id: "doe" }),
      ],
      image: "https://picsum.photos/seed/picsum/200/300",
      isAdmin: false,
      notification: {
        count: 0,
      },
      title: "Event 1 from factory",
      description: "Description of event 1",
      date: {
        start: new Date("2020-01-01").toISOString(),
        end: null,
      },
      location: {
        name: "Location 1",
        address: "Address 1",
      },
      survey: {
        title: "Vote pour la date !",
        isPending: true,
      },
      ...item,
    };
  };

  static ARCHIVED_EVENT = (item: Partial<ArchivedEvent>): ArchivedEvent => {
    return {
      id: "1",
      guests: [GuestFactory.GUEST({ id: "me" })],
      image: "https://picsum.photos/seed/picsum/200/300",
      isAdmin: false,
      notification: {
        count: 0,
      },
      title: "Event 1 from factory",
      description: "Description of archived 1",
      date: {
        start: "2020-01-01",
        end: null,
      },
      location: {
        name: "National Archives 1",
        address: "Address NA 1",
      },
      survey: {
        title: "Vote pour la date !",
        isPending: false,
      },
      ...item,
    };
  };
}

import { EventFactory } from "@events/core/models/Event.factory";
import { EventList } from "../../../core/models/Event.model";

export const useArchivesList = () => {
  const events: EventList = [
    EventFactory.EVENT({
      id: "1",
      image: "https://picsum.photos/204",
      title: "Anniversaire Marco",
      start: new Date().toISOString(),
      guests: ["John", "Doe"],
      notification: {
        count: 1,
      },
      isAdmin: true,
    }),
    EventFactory.EVENT({
      id: "2",
      image: "https://picsum.photos/308",
      title: "Resto entre amis",
      start: new Date().toISOString(),
      end: null,
      guests: ["John", "Doe"],
      notification: {
        count: 2,
      },
      isAdmin: false,
    }),
  ];

  return {
    events,
  };
};

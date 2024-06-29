import { Event } from "../../../core/Event.model";

export const useEventsList = () => {
  const events: Event[] = [
    {
      id: "1",
      image: "https://picsum.photos/204",
      title: "Anniversaire Marco",
      date: new Date(),
      guests: ["John", "Doe"],
      notification: {
        count: 1,
      },
      isAdmin: true,
    },
    {
      id: "2",
      image: "https://picsum.photos/308",
      title: "Resto entre amis",
      date: new Date(),
      guests: ["John", "Doe"],
      notification: {
        count: 2,
      },
      isAdmin: false,
    },
  ];

  return {
    events,
  };
};

import { Event } from "@/src/modules/events/core/Event.model";

export const useChatScreen = (eventId: string) => {
  const event: Event = {
    id: "1",
    image: "https://picsum.photos/204",
    title: "Anniversaire Marco",
    date: new Date(),
    guests: ["John", "Doe"],
    notification: {
      count: 1,
    },
    isAdmin: true,
  };

  return {
    event,
  };
};

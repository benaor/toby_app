import { useCallback } from "react";
import { EventList } from "../../../core/EventList.model";
import { screens } from "@constants/screens";
import { useRouter } from "expo-router";

export const useEventsList = () => {
  const { navigate } = useRouter();
  const events: EventList = [
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

  const goToEvent = useCallback(
    (eventId: string) => navigate(screens.event(eventId)),
    [navigate],
  );

  return {
    events,
    goToEvent,
  };
};

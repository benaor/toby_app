import { SectionListData } from "react-native";
import {
  CalendarEvent,
  CalendarEventList,
} from "../../../core/CalendarEventList.model";
import { calendarEventListToSectionList } from "@utils/arrays/calendarEventListToSectionList";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { screens } from "@constants/screens";

type SectionsCalendarEventList = {
  title: string;
  data: CalendarEvent[];
};

export type ArrayOfSectionsListOfEvent = SectionListData<
  CalendarEvent,
  SectionsCalendarEventList
>[];

export const useCalendarScreen = () => {
  const { push } = useRouter();

  const events: CalendarEventList = [
    {
      id: "1",
      title: "Event 1",
      start: new Date("2021-09-01"),
      end: new Date("2021-09-02"),
    },
    {
      id: "2",
      title: "Event 2",
      start: new Date("2021-08-03"),
      end: null,
    },
    {
      id: "3",
      title: "Event 3",
      start: new Date("2021-08-03"),
      end: new Date("2021-08-12"),
    },
  ];

  const sectionsOfEvents: ArrayOfSectionsListOfEvent =
    calendarEventListToSectionList(events);

  const goToEvent = useCallback(
    (id: string) => {
      push(screens.event(id));
    },
    [push],
  );

  return {
    events,
    sectionsOfEvents,
    goToEvent,
  };
};

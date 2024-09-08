import { SectionListData } from "react-native";
import {
  CalendarEvent,
  CalendarEventList,
} from "../../../core/CalendarEventList.model";

type SectionsCalendarEventList = {
  title: string;
  data: CalendarEvent[];
};

export type ArrayOfSectionsListOfEvent = SectionListData<
  CalendarEvent,
  SectionsCalendarEventList
>[];

export const useCalendarScreen = () => {
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

  const sectionsOfEvents: ArrayOfSectionsListOfEvent = [
    {
      title: "Section 1",
      data: [events[0], events[1]],
    },
    {
      title: "Section 2",
      data: [events[2]],
    },
  ];

  return {
    events,
    sectionsOfEvents,
  };
};

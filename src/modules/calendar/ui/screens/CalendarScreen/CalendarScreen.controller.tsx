import { SectionListData } from "react-native";
import { CalendarEvent } from "../../../core/CalendarEventList.model";
import { calendarEventListToSectionList } from "@utils/arrays/calendarEventListToSectionList";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { screens } from "@constants/screens";
import { useSelector } from "react-redux";
import { eventsSelector } from "@events/core/selectors/events.selector";

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
  const events = useSelector(eventsSelector);

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

import { CalendarEventList } from "@calendar/core/CalendarEventList.model";
import { ArrayOfSectionsListOfEvent } from "@calendar/ui/screens/CalendarScreen/CalendarScreen.controller";

export const calendarEventListToSectionList = (
  eventList: CalendarEventList,
): ArrayOfSectionsListOfEvent => {
  const arrayOfSection: ArrayOfSectionsListOfEvent = [];

  eventList.forEach((event) => {
    const mount = new Date(event.start).toLocaleDateString("fr-FR", {
      month: "long",
    });

    const sectionOfMonth = arrayOfSection.findIndex(
      (section) => section.title === mount,
    );

    if (sectionOfMonth !== -1)
      return arrayOfSection[sectionOfMonth].data.push(event);

    return arrayOfSection.push({ title: mount, data: [event] });
  });

  return sortDataSectionByDate(arrayOfSection);
};

const sortDataSectionByDate = (data: ArrayOfSectionsListOfEvent) =>
  data.map((section) => ({
    title: section.title,
    data: sortCalendarEventDataByDate(section.data),
  }));

const sortCalendarEventDataByDate = (events: CalendarEventList) =>
  events.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

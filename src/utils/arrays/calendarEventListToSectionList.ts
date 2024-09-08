import { CalendarEventList } from "@calendar/core/CalendarEventList.model";
import { ArrayOfSectionsListOfEvent } from "@calendar/ui/screens/CalendarScreen/CalendarScreen.controller";

export const calendarEventListToSectionList = (
  eventList: CalendarEventList,
): ArrayOfSectionsListOfEvent => {
  const arrayOfSection: ArrayOfSectionsListOfEvent = [];

  eventList.forEach((event) => {
    const mount = event.start.toLocaleDateString("fr-FR", { month: "long" });

    const sectionOfMonth = arrayOfSection.findIndex(
      (section) => section.title === mount,
    );

    if (sectionOfMonth !== -1)
      return arrayOfSection[sectionOfMonth].data.push(event);

    return arrayOfSection.push({ title: mount, data: [event] });
  });

  return arrayOfSection;
};

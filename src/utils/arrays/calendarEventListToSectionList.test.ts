import { CalendarEventList } from "@calendar/core/CalendarEventList.model";
import { calendarEventListToSectionList } from "./calendarEventListToSectionList";
import { CalendarEventFactory } from "@calendar/core/CalendarEvent.factory";
import { ArrayOfSectionsListOfEvent } from "@calendar/ui/screens/CalendarScreen/CalendarScreen.controller";

// TODO: refactor using jest.each
describe("Transform a list to SectionList data", () => {
  it("should return empty array", () => {
    const eventList: CalendarEventList = [];
    const result = calendarEventListToSectionList(eventList);

    expect(result).toStrictEqual([]);
  });

  it("should return a list with one section named JANVIER and NEW YEAR as data", () => {
    const event = CalendarEventFactory.create({
      date: {
        start: "2024-01-01",
        end: null,
      },
    });

    const eventList: CalendarEventList = [event];
    const result = calendarEventListToSectionList(eventList);
    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier 2024", data: [event] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with one section named FEVRIER and NEW YEAR as data", () => {
    const event = CalendarEventFactory.create({
      date: {
        start: "2024-02-02",
        end: null,
      },
    });

    const eventList: CalendarEventList = [event];
    const result = calendarEventListToSectionList(eventList);
    const expected: ArrayOfSectionsListOfEvent = [
      { title: "février 2024", data: [event] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with two section named JANVIER & FEVRIER and NEW YEAR as data for the both", () => {
    const january = CalendarEventFactory.create({
      date: {
        start: "2024-01-01",
        end: null,
      },
    });

    const february = CalendarEventFactory.create({
      date: {
        start: "2024-02-02",
        end: null,
      },
    });

    const eventList: CalendarEventList = [january, february];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier 2024", data: [january] },
      { title: "février 2024", data: [february] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with one section named JANVIER which contain TWO data object", () => {
    const first = CalendarEventFactory.create();
    const second = CalendarEventFactory.create();

    const eventList: CalendarEventList = [first, second];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier 2024", data: [first, second] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with two sections named JANVIER and JUIN which each contain TWO data object, and each data array is SORTED BY DATE", () => {
    const firstOnJanuary = CalendarEventFactory.create();
    const secondOnJanuary = CalendarEventFactory.create();
    const firstOnJune = CalendarEventFactory.create({
      title: "Fête de la musique",
      date: {
        start: "2024-06-21",
        end: null,
      },
    });
    const secondOnJune = CalendarEventFactory.create({
      title: "Feux de la Saint-Jean",
      date: {
        start: "2024-06-24",
        end: null,
      },
    });

    const eventList: CalendarEventList = [
      secondOnJune,
      secondOnJanuary,
      firstOnJanuary,
      firstOnJune,
    ];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "juin 2024", data: [firstOnJune, secondOnJune] },
      { title: "janvier 2024", data: [firstOnJanuary, secondOnJanuary] },
    ];

    expect(result).toStrictEqual(expected);
  });
});

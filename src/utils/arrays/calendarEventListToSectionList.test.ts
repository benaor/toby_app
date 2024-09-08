import { CalendarEventList } from "@calendar/core/CalendarEventList.model";
import { calendarEventListToSectionList } from "./calendarEventListToSectionList";
import { CalendarEventFactory } from "@calendar/core/CalendarEvent.factory";
import { ArrayOfSectionsListOfEvent } from "@calendar/ui/screens/CalendarScreen/CalendarScreen.controller";

describe("Transform a list to SectionList data", () => {
  it("should return empty array", () => {
    const eventList: CalendarEventList = [];
    const result = calendarEventListToSectionList(eventList);

    expect(result).toStrictEqual([]);
  });

  it("should return a list with one section named JANVIER and NEW YEAR as data", () => {
    const event = CalendarEventFactory.create({
      start: new Date("2024-01-01"),
    });

    const eventList: CalendarEventList = [event];
    const result = calendarEventListToSectionList(eventList);
    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier", data: [event] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with one section named FEVRIER and NEW YEAR as data", () => {
    const event = CalendarEventFactory.create({
      start: new Date("2024-02-02"),
    });

    const eventList: CalendarEventList = [event];
    const result = calendarEventListToSectionList(eventList);
    const expected: ArrayOfSectionsListOfEvent = [
      { title: "février", data: [event] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with two section named JANVIER & FEVRIER and NEW YEAR as data for the both", () => {
    const january = CalendarEventFactory.create({
      start: new Date("2024-01-01"),
    });

    const february = CalendarEventFactory.create({
      start: new Date("2024-02-02"),
    });

    const eventList: CalendarEventList = [january, february];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier", data: [january] },
      { title: "février", data: [february] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with one section named JANVIER which contain TWO data object", () => {
    const first = CalendarEventFactory.create();
    const second = CalendarEventFactory.create();

    const eventList: CalendarEventList = [first, second];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "janvier", data: [first, second] },
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should return a list with two sections named JANVIER and JUIN which each contain TWO data object", () => {
    const firstOnJanuary = CalendarEventFactory.create();
    const secondOnJanuary = CalendarEventFactory.create();
    const firstOnJune = CalendarEventFactory.create({
      title: "Fête de la musique",
      start: new Date("2024-06-21"),
    });
    const secondOnJune = CalendarEventFactory.create({
      start: new Date("2024-06-24"),
      title: "Feux de la Saint-Jean",
    });

    const eventList: CalendarEventList = [
      firstOnJune,
      firstOnJanuary,
      secondOnJune,
      secondOnJanuary,
    ];
    const result = calendarEventListToSectionList(eventList);

    const expected: ArrayOfSectionsListOfEvent = [
      { title: "juin", data: [firstOnJune, secondOnJune] },
      { title: "janvier", data: [firstOnJanuary, secondOnJanuary] },
    ];

    expect(result).toStrictEqual(expected);
  });
});

import { CalendarEvent } from "./CalendarEventList.model";

export class CalendarEventFactory {
  static create(event?: Partial<CalendarEvent>): CalendarEvent {
    return {
      id: "1",
      title: "new year",
      start: "2024-01-01",
      end: null,
      ...event,
    };
  }
}

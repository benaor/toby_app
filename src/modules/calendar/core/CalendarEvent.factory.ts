import { CalendarEvent } from "./CalendarEventList.model";

export class CalendarEventFactory {
  static create(event?: Partial<CalendarEvent>): CalendarEvent {
    return {
      id: event?.id || "1",
      title: event?.title || "new year",
      start: event?.start || new Date("2024-01-01"),
      end: event?.end || null,
    };
  }
}

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
};

export type CalendarEventList = CalendarEvent[];

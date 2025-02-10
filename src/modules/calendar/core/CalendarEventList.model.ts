export type CalendarEvent = {
  id: string;
  title: string;
  date: {
    start: ISO8601;
    end: ISO8601 | null;
  };
};

export type CalendarEventList = CalendarEvent[];

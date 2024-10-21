export type Event = {
  id: Identifier;
  image: string;
  title: string;
  start: ISO8601;
  end: ISO8601 | null;
  guests: Identifier[];
  notification: {
    count: number;
  };
  isAdmin: boolean;
};
export type EventList = Event[];

export type ArchivedEvent = Event;
export type ArchivedEventList = ArchivedEvent[];

export type Event = {
  id: Identifier;
  title: string;
  description: string;
  image: string;
  start: ISO8601;
  end: ISO8601 | null;
  guests: Identifier[];
};

export type UserEvent = Event & {
  notification: {
    count: number;
  };
  isAdmin: boolean;
};

export type EventList = UserEvent[];

export type ArchivedEvent = UserEvent;
export type ArchivedEventList = ArchivedEvent[];

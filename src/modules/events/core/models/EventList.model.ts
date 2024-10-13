export type EventList = {
  id: Identifier;
  image: string;
  title: string;
  date: ISO8601;
  guests: Identifier[];
  notification: {
    count: number;
  };
  isAdmin: boolean;
}[];

export type eventListItem = EventList[number];

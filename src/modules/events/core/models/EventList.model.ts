export type EventList = {
  id: Identifier;
  image: string;
  title: string;
  date: Date;
  guests: Identifier[];
  notification: {
    count: number;
  };
  isAdmin: boolean;
}[];

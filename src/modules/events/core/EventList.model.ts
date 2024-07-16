export type EventList = {
  id: string;
  image: string;
  title: string;
  date: Date;
  guests: string[];
  notification: {
    count: number;
  };
  isAdmin: boolean;
}[];

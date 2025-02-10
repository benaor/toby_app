import { Guest } from "./Guest.model";

export type Event = {
  id: Identifier;
  title: string;
  description: string;
  image: string;
  guests: Guest[];
  location: {
    name: string;
    address: string;
  };
  date: {
    start: ISO8601;
    end: ISO8601 | null;
  };
  survey?: {
    title: string;
    isPending: boolean;
  };
};

export type UserEvent = Event & {
  invitationAccepted?: boolean;
  notification: {
    count: number;
  };
  isAdmin: boolean;
  pool?: {
    title: string;
    hasParticipated: boolean;
  };
};

export type EventList = UserEvent[];

export type ArchivedEvent = UserEvent;
export type ArchivedEventList = ArchivedEvent[];

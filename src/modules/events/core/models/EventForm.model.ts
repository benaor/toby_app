const eventTypes = [
  "birthday",
  "wedding",
  "anniversary",
  "corporate",
  "other",
] as const;

export type EventType = (typeof eventTypes)[number];

export type EventFormType = {
  type: EventType;
};

export type EventFormGeneralsInfos = {
  title: string;
  description: string;
  image: string;
};

export type EventFormAdditionalsInfos = {
  location: {
    name: string;
    address: string;
  };
};

export type EventForm = EventFormType &
  EventFormGeneralsInfos &
  EventFormAdditionalsInfos;

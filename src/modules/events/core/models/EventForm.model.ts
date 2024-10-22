const eventTypes = [
  "birthday",
  "wedding",
  "anniversary",
  "corporate",
  "other",
] as const;

export type EventType = (typeof eventTypes)[number];

export type EventForm = {
  type: Nullable<EventType>;
};

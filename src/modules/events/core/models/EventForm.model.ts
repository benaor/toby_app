export enum CreationStep {
  ChooseEvent = "ChooseEvent",
  EventInformations = "EventInformations",
  EventAdditionalInfos = "EventAdditionalInfos",
  AddGuestsToEvent = "AddGuestsToEvent",
  AddEventModules = "AddEventModules",
}

const eventTypes = [
  "birthday",
  "weekend",
  "holidays",
  "stagparty",
  "wedding",
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
  date: {
    start: ISO8601;
    end: ISO8601 | null;
  };
};

export type EventFormGuests = {
  guests: Identifier[];
};

export type EventFormModules = {
  modules: {
    location: boolean;
    activity: boolean;
    budget: boolean;
    cagnotte: boolean;
  };
};

export type EventForm = Nullable<EventFormType> &
  Nullable<EventFormGeneralsInfos> &
  Nullable<EventFormAdditionalsInfos> &
  Nullable<EventFormGuests> &
  EventFormModules;

export type EventCreationForm = EventFormType &
  EventFormGeneralsInfos &
  EventFormAdditionalsInfos &
  EventFormGuests &
  EventFormModules;

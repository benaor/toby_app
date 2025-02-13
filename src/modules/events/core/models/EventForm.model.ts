/* istanbul ignore file */
import { Guest } from "./Guest.model";

export enum CreationStep {
  ChooseEvent = "ChooseEvent",
  EventInformations = "EventInformations",
  EventAdditionalInfos = "EventAdditionalInfos",
  AddGuestsToEvent = "AddGuestsToEvent",
  AddEventModules = "AddEventModules",
}

type EventTypes = [
  "birthday",
  "weekend",
  "holidays",
  "stagparty",
  "wedding",
  "other",
];

export type EventType = EventTypes[number];

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
  guests: Guest[];
};

export type EventFormModules = {
  modules: {
    location: boolean;
    activity: boolean;
    budget: boolean;
    cagnotte: boolean;
  };
};

export type EventCreationForm = EventFormType &
  EventFormGeneralsInfos &
  EventFormAdditionalsInfos &
  EventFormGuests &
  EventFormModules;

export type EventForm = DeepNullableExcept<
  EventCreationForm,
  "modules" | "guests"
>;

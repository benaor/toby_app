import { AppState } from "@store/store";
import { eventsSelectors } from "../slices/event.slice";

export const allEventsSelector = (state: AppState) =>
  eventsSelectors.selectAll(state.events);

export const eventsStateSelector = (state: AppState) => state.events;

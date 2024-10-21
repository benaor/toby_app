import { AppState } from "@store/store";
import { eventsSelectors } from "../slices/event.slice";

export const eventsSelector = (state: AppState) =>
  eventsSelectors.selectAll(state.events);

export const EventsSortedByDateSelector = (state: AppState) =>
  eventsSelectors
    .selectAll(state.events)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

import { AppState } from "@store/store";
import { eventsSelectors } from "../slices/event.slice";

export const eventsSelector = (state: AppState) =>
  eventsSelectors.selectAll(state.events);

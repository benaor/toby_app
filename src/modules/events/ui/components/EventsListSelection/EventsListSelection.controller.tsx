import { useSelector } from "react-redux";
import {
  allEventsSelector,
  eventsStateSelector,
} from "@events/core/selectors/events.selector";

export const useEventsListSelection = () => {
  const events = useSelector(allEventsSelector);
  const { status, error } = useSelector(eventsStateSelector);

  return {
    events,
    isLoading: status === "loading",
    error,
  };
};

import { useSelector } from "react-redux";
import { eventsSelector } from "@events/core/selectors/events.selector";

export const useEventsListSelection = () => {
  const events = useSelector(eventsSelector);

  return {
    events,
  };
};

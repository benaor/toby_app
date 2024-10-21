import { useCallback } from "react";
import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import {
  allEventsSelector,
  eventsStateSelector,
} from "@events/core/selectors/events.selector";

export const useEventsList = () => {
  const { navigate } = useRouter();
  const events = useSelector(allEventsSelector);
  const { status, error } = useSelector(eventsStateSelector);

  const goToEvent = useCallback(
    (eventId: string) => navigate(screens.event(eventId)),
    [navigate],
  );

  return {
    events,
    isLoading: status === "loading",
    error,
    goToEvent,
  };
};

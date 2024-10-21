import { screens } from "@constants/screens";
import { allEventsSelector } from "@events/core/selectors/events.selector";
import { fetchEventsList } from "@events/core/usecases/fetchEvent.usecase";
import { AppState } from "@store/store";
import { useAppDispatch } from "@store/useAppDispatch";

import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useEventsListScreen = () => {
  const dispatch = useAppDispatch();
  const events = useSelector(allEventsSelector);
  const { status, error } = useSelector((state: AppState) => state.events);

  const [editMode, setEditMode] = useState(false);
  const { push } = useRouter();

  const toggleEditMode = useCallback(() => {
    setEditMode((em) => !em);
  }, []);

  const goToArchives = useCallback(() => {
    push(screens.archives);
  }, [push]);

  const opencreateEventModal = useCallback(() => {
    push(screens.newEvent);
  }, [push]);

  useEffect(() => {
    if (events.length > 0) return;
    const promise = dispatch(fetchEventsList());
    return () => promise.abort();
  }, [dispatch]);

  return {
    editMode,
    goToArchives,
    toggleEditMode,
    opencreateEventModal,
    error,
    isLoading: status === "loading",
  };
};

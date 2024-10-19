import { screens } from "@constants/screens";
import { fetchEventsList } from "@events/core/usecases/fetchEvent.usecase";
import { useAppDispatch } from "@store/useAppDispatch";

import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export const useEventsListScreen = () => {
  const dispatch = useAppDispatch();
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
    dispatch(fetchEventsList());
  }, [dispatch]);

  return {
    editMode,
    goToArchives,
    toggleEditMode,
    opencreateEventModal,
  };
};

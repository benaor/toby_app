import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export const useEventsListScreen = () => {
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

  return {
    editMode,
    goToArchives,
    toggleEditMode,
    opencreateEventModal,
  };
};

import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useEventsListScreen = () => {
  const { push } = useRouter();

  const goToArchives = useCallback(() => {
    push(screens.archives);
  }, [push]);

  return {
    goToArchives,
  };
};

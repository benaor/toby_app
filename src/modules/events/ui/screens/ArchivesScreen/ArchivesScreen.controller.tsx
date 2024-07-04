import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useArchivesScreen = () => {
  const { back } = useRouter();

  const goBack = useCallback(back, [back]);
  return {
    goBack,
  };
};

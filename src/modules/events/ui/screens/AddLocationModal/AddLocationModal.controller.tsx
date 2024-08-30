import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useAddLocationModal = () => {
  const { back } = useRouter();

  const saveLocation = useCallback(() => {
    back();
  }, [back]);

  return {
    saveLocation,
  };
};

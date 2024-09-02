import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useEditDateModal = () => {
  const { back } = useRouter();

  const changeEventDate = useCallback(() => {
    back();
  }, [back]);

  return {
    changeEventDate,
  };
};

import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useAddPoolModal = () => {
  const { back } = useRouter();

  const createPool = useCallback(() => {
    back();
  }, [back]);

  return {
    createPool,
  };
};

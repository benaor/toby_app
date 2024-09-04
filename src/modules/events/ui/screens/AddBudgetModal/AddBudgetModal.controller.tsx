import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useAddBudgetModal = () => {
  const { back } = useRouter();

  const createBudget = useCallback(() => {
    back();
  }, [back]);

  return {
    createBudget,
  };
};

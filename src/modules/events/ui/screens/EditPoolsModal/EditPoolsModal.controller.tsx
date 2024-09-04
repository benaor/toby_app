import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useEditPoolsModal = () => {
  const { navigate } = useRouter();

  const pools = [
    {
      id: "1",
      name: "Cagnotte 1",
    },
    {
      id: "2",
      name: "Cagnotte 2",
    },
  ];

  const deletePool = (id: string) => {};
  const addPool = useCallback(() => {
    navigate(screens.addPool("1"));
  }, [navigate]);

  return {
    pools,
    deletePool,
    addPool,
  };
};

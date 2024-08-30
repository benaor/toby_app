import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useEditLocationModal = () => {
  const locations = [
    {
      id: "1",
      name: "Le Five",
    },
    {
      id: "2",
      name: "Bouillon Pigalle",
    },
    {
      id: "3",
      name: "Le Perchoir",
    },
  ];

  const { push } = useRouter();

  const deleteLocation = useCallback((id: string) => {}, []);

  const addLocation = useCallback(() => {
    push(screens.addLocation("1"));
  }, [push]);

  return {
    locations,
    deleteLocation,
    addLocation,
  };
};

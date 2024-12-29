import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignInWelcomeScreen = () => {
  const { replace } = useRouter();

  const goToHome = useCallback(() => {
    replace(screens.routes.home);
  }, [replace]);

  return {
    goToHome,
  };
};

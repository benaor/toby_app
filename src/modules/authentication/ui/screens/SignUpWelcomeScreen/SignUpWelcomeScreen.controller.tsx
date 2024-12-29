import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignUpWelcomeScreen = () => {
  const { replace } = useRouter();

  const redirectToHome = useCallback(() => {
    replace(screens.routes.home);
  }, [replace]);

  return {
    redirectToHome,
  };
};

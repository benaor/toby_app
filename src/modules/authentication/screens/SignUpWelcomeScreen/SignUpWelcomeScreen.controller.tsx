import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignUpWelcomeScreen = () => {
  const { replace } = useRouter();

  const redirectToHome = useCallback(() => {
    replace("home");
  }, [replace]);

  return {
    redirectToHome,
  };
};

import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignInCredentialsScreen = () => {
  const { replace } = useRouter();

  const goToSignUpScreen = useCallback(() => {
    replace(screens.signUp);
  }, [replace]);

  return {
    goToSignUpScreen,
  };
};

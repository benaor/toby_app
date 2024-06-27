import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useSignUpInfosScreen = () => {
  const { replace } = useRouter();

  const registerNewUser = () => {};

  const goToLoginScreen = useCallback(() => {
    replace(screens.signIn);
  }, [replace]);

  return {
    registerNewUser,
    goToLoginScreen,
  };
};

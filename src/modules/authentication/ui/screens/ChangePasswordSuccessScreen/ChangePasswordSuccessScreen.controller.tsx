import { screens } from "@constants/screens";
import { useRouter } from "expo-router";

export const useChangePasswordSuccessScreen = () => {
  const { replace } = useRouter();

  const goToSignInScreen = () => {
    replace(screens.routes.signIn);
  };

  return {
    goToSignInScreen,
  };
};

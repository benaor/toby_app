import { Credentials } from "@authentication/core/models/Credentials.type";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export const useSignInCredentialsScreen = () => {
  const { replace } = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const { signInWithEmail } = useAuthentication();

  const signIn = useCallback(async () => {
    const session = await signInWithEmail(credentials);
    if (!session) alert("Error signing in");
    else alert("Signed in");
  }, [credentials, signInWithEmail]);

  const handleEmailChange = useCallback(
    (email: string) => setCredentials({ ...credentials, email }),
    [credentials, setCredentials],
  );

  const handlePasswordChange = useCallback(
    (password: string) => setCredentials({ ...credentials, password }),
    [credentials, setCredentials],
  );

  const goToForgetPasswordScreen = useCallback(() => {
    replace(screens.forgotPassword);
  }, [replace]);

  const goToSignUpScreen = useCallback(() => {
    replace(screens.signUp);
  }, [replace]);

  return {
    goToSignUpScreen,
    goToForgetPasswordScreen,
    credentials,
    handleEmailChange,
    handlePasswordChange,
    signIn,
  };
};

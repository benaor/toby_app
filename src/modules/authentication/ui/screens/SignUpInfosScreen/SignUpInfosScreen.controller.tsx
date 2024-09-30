import { UserForm } from "@authentication/core/models/AuthUser.type";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export const useSignUpInfosScreen = () => {
  const { replace } = useRouter();
  const { register } = useAuthentication();

  const [error, setError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerNewUser = async () => {
    setError(null);
    setIsRegisterLoading(true);

    const userForm: UserForm = {
      firstName,
      lastName,
      email,
      password,
    };

    const res = await register(userForm);
    setIsRegisterLoading(false);

    if ("error" in res) setError(res.error);
  };

  const goToLoginScreen = useCallback(() => {
    replace(screens.signIn);
  }, [replace]);

  return {
    goToLoginScreen,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    isRegisterLoading,
    registerNewUser,
    error,
  };
};

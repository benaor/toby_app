import { ChangePasswordSuccessScreen } from "@authentication/ui/screens/ChangePasswordSuccessScreen";
import { CheckMailScreen } from "@authentication/ui/screens/CheckMailScreen";
import { NewPasswordScreen } from "@authentication/ui/screens/NewPasswordScreen";
import { PasswordReinitializationScreen } from "@authentication/ui/screens/PasswordReinitializationScreen";

export default function ForgotPasswordScreen() {
  const step: number = 1;
  return (
    <>
      {step === 1 && <PasswordReinitializationScreen />}
      {step === 2 && <CheckMailScreen />}
      {step === 3 && <NewPasswordScreen />}
      {step === 4 && <ChangePasswordSuccessScreen />}
    </>
  );
}

import { SignUpInfosScreen } from "@authentication/ui/screens/SignUpInfosScreen";
import { SignUpSecurityCodeScreen } from "@authentication/ui/screens/SignUpSecurityCodeScreen";
import { SignUpWelcomeScreen } from "@authentication/ui/screens/SignUpWelcomeScreen";

export default function SignUpScreen() {
  const step: number = 1;

  return (
    <>
      {step === 1 && <SignUpInfosScreen />}
      {step === 2 && <SignUpSecurityCodeScreen />}
      {step === 3 && <SignUpWelcomeScreen />}
    </>
  );
}

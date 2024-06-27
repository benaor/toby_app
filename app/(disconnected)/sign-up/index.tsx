import { SignUpInfosScreen } from "@authentication/screens/SignUpInfosScreen";
import { SignUpSecurityCodeScreen } from "@authentication/screens/SignUpSecurityCodeScreen";
import { SignUpWelcomeScreen } from "@authentication/screens/SignUpWelcomeScreen";

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

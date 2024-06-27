import { SignInCredentialsScreen } from "@authentication/ui/screens/SignInCredentialsScreen";
import { SignInSecurityCodeScreen } from "@authentication/ui/screens/SignInSecurityCodeScreen";
import { SignInWelcomeScreen } from "@authentication/ui/screens/SignInWelcomeScreen";

export default function SignInScreen() {
  const step: number = 3;
  return (
    <>
      {step === 1 && <SignInCredentialsScreen />}
      {step === 2 && <SignInSecurityCodeScreen />}
      {step === 3 && <SignInWelcomeScreen />}
    </>
  );
}

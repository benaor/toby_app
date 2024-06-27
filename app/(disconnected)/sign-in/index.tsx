import { SignInCredentialsScreen } from "@authentication/screens/SignInCredentialsScreen";
import { SignInSecurityCodeScreen } from "@authentication/screens/SignInSecurityCodeScreen";
import { SignInWelcomeScreen } from "@authentication/screens/SignInWelcomeScreen";

export default function SignInScreen() {
  const step: number = 1;
  return (
    <>
      {step === 1 && <SignInCredentialsScreen />}
      {step === 2 && <SignInSecurityCodeScreen />}
      {step === 3 && <SignInWelcomeScreen />}
    </>
  );
}

import { FC } from "react";
import { useSignInSecurityCodeScreen } from "./SignInSecurityCodeScreen.controller";
import { SecurityCodeScreen } from "@authentication/ui/components/SecurityCodeScreen";

export const SignInSecurityCodeScreen: FC = () => {
  const { verifySecurityCode } = useSignInSecurityCodeScreen();

  return <SecurityCodeScreen onValidate={verifySecurityCode} />;
};

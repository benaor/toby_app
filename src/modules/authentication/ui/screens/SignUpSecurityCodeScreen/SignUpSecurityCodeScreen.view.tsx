import { useSignUpSecurityCodeScreen } from "./SignUpSecurityCodeScreen.controller";
import { FC } from "react";
import { SecurityCodeScreen } from "@authentication/ui/components/SecurityCodeScreen";

export const SignUpSecurityCodeScreen: FC = () => {
  const { verifySecurityCode } = useSignUpSecurityCodeScreen();

  return <SecurityCodeScreen onValidate={verifySecurityCode} />;
};

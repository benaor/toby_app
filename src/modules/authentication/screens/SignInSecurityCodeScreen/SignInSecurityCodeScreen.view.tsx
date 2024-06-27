import { Typography } from "@components/Typography";
import { FC } from "react";
import { View } from "react-native";
import { useSignInSecurityCodeScreen } from "./SignInSecurityCodeScreen.controller";

export const SignInSecurityCodeScreen: FC = () => {
  const presenter = useSignInSecurityCodeScreen();

  return (
    <View>
      <Typography.Header size="large">Code de sécurité</Typography.Header>
    </View>
  );
};

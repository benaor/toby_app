import { Typography } from "@components/Typography";
import { View } from "react-native";
import { useSignInWelcomeScreen } from "./SignInWelcomeScreen.controller";
import { FC } from "react";

export const SignInWelcomeScreen: FC = () => {
  const presenter = useSignInWelcomeScreen();
  return (
    <View>
      <Typography.Header size="large">Bienvenue !</Typography.Header>
    </View>
  );
};

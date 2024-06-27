import { FC } from "react";
import { useSignInCredentialsScreen } from "./SignInCredentialsScreen.controller";
import { View } from "react-native";
import { Typography } from "@components/Typography";

export const SignInCredentialsScreen: FC = () => {
  const presenter = useSignInCredentialsScreen();

  return (
    <View>
      <Typography.Header size="large">Connexion</Typography.Header>
    </View>
  );
};

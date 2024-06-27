import { Typography } from "@components/Typography";
import { FC } from "react";
import { useSignUpWelcomeScreen } from "./SignUpWelcomeScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

export const SignUpWelcomeScreen: FC = () => {
  const presenter = useSignUpWelcomeScreen();
  return (
    <View style={styles.container}>
      <Typography.Body>SignUpWelcomeScreen</Typography.Body>
    </View>
  );
};

const styles = createStyleSheet(() => ({
  container: {},
}));

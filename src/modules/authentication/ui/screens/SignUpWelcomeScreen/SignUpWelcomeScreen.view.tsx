import { Typography } from "@components/Typography";
import { FC, useEffect } from "react";
import { useSignUpWelcomeScreen } from "./SignUpWelcomeScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";
import SignUpWelcomeSVG from "@images/signup-welcome.svg";

export const SignUpWelcomeScreen: FC = () => {
  const { redirectToHome } = useSignUpWelcomeScreen();

  useEffect(() => {
    const timeout = setTimeout(redirectToHome, 3000);
    return () => clearTimeout(timeout);
  }, [redirectToHome]);

  return (
    <View style={styles.container}>
      <SignUpWelcomeSVG />
      <View style={styles.textContainer}>
        <Typography.Header size="large">Bienvenue !</Typography.Header>
      </View>
      <SignUpWelcomeSVG style={styles.bottomImage} />
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    height: "100%",
    width: "100%",
    paddingTop: 40,
  },
  textContainer: {
    padding: 24,
  },
  bottomImage: {
    position: "absolute",
    overflow: "hidden",
    scaleX: 1.75,
    scaleY: 2,
    bottom: 0,
    right: 0,
  },
}));

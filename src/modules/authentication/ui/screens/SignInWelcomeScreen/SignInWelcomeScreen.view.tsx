import { Typography } from "@components/Typography";
import { View } from "react-native";
import { useSignInWelcomeScreen } from "./SignInWelcomeScreen.controller";
import { FC } from "react";
import SignUpWelcomeSVG from "@images/signup-welcome.svg";

import { createStyleSheet } from "@themes/createStyleSheet";
import { Button } from "@components/Button";
import { useTheme } from "@themes/useTheme";

export const SignInWelcomeScreen: FC = () => {
  const { goToHome } = useSignInWelcomeScreen();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <SignUpWelcomeSVG />
      <View style={styles.textContainer}>
        <Typography.Header size="large">
          Heureux de vous revoir !
        </Typography.Header>
        <Typography.Body lvlColor="medium">
          Vous voilà de nouveau connecté à votre application préféré 😃
        </Typography.Body>
        <Button fullWidth onPress={goToHome}>
          <Button.Label label="C'est parti !" />
          <Button.Icon name="arrowright" color={colors.typography.low} />
        </Button>
      </View>
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
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

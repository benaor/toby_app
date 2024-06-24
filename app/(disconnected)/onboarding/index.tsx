import { View } from "react-native";

import { createStyleSheet } from "@themes/createStyleSheet";
import OnboardingSVG from "@images/onboarding-1.svg";
import { Typography } from "@/src/components/Typography";
import { Button } from "@components/Button";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function OnboardingScreen() {
  const { replace } = useRouter();

  const goToSignUp = useCallback(() => {
    replace("/sign-up");
  }, [replace]);

  const goToSignIn = useCallback(() => {
    replace("/sign-in");
  }, [replace]);

  return (
    <View style={styles.container}>
      <OnboardingSVG />
      <View style={styles.messageView}>
        <Typography.Header style={styles.messageText}>
          Simple.Basique.
        </Typography.Header>
        <Typography.Body style={styles.messageText}>
          Simplifiez-vous l’organisation de vos évènements entre amis !
        </Typography.Body>
      </View>
      <View style={styles.ButtonView}>
        <Button onPress={goToSignUp}>
          <Button.Label label="S'inscrire" />
        </Button>
        <Button variant="text" onPress={goToSignIn}>
          <Button.Label label="Se connecter" />
        </Button>
      </View>
    </View>
  );
}

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  messageView: {
    paddingHorizontal: 50,
    alignItems: "center",
    gap: 10,
  },
  messageText: {
    textAlign: "center",
    color: theme.colors.typography.medium,
  },
  ButtonView: {
    paddingTop: 50,
    gap: 10,
  },
}));

import { View } from "react-native";

import { createStyleSheet } from "@themes/createStyleSheet";
import OnboardingSVG from "@images/onboarding-1.svg";
import { Typography } from "@/src/components/Typography";
import { Button } from "@components/Button";

export default function OnboardingScreen() {
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
        <Button onPress={() => {}}>
          <Button.Label label="S'inscrire" />
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
    paddingVertical: 50,
  },
}));

import { View } from "react-native";

import { createStyleSheet } from "@theme/createStyleSheet";
import OnboardingSVG from "@images/onboarding-1.svg";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <OnboardingSVG />
    </View>
  );
}

const styles = createStyleSheet((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

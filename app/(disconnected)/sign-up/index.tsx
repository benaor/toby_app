import { Typography } from "@/src/components";
import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Typography.Header size="large">Inscription</Typography.Header>
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
    padding: 25,
    gap: 20,
  },
}));

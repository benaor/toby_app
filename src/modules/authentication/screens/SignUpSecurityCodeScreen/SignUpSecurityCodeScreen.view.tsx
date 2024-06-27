import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useSignUpSecurityCodeScreen } from "./SignUpSecurityCodeScreen.controller";
import { Typography } from "@components/Typography";

export const SignUpSecurityCodeScreen = () => {
  const presenter = useSignUpSecurityCodeScreen();

  return (
    <View style={styles.container}>
      <Typography.Header size="large">SignUpSecurityCode</Typography.Header>
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {},
}));

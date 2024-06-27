import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useSignUpSecurityCodeScreen } from "./SignUpSecurityCodeScreen.controller";
import { Typography } from "@components/Typography";
import CodeSecrureSVG from "@images/code-secure.svg";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";

export const SignUpSecurityCodeScreen: FC = () => {
  const { verifySecurityCode } = useSignUpSecurityCodeScreen();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <CodeSecrureSVG />
      <View style={styles.textContainer}>
        <Typography.Header size="large">Code de sécurité</Typography.Header>
        <Typography.Body>
          Saisissez le code de sécurité que vous venez de recevoir sur votre
          adresse mail.
        </Typography.Body>
        <TextInput keyboardType="decimal-pad" placeholder="Code de sécurité" />
        <Button fullWidth onPress={verifySecurityCode}>
          <Button.Label label="Valider" />
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    gap: 16,
    padding: 24,
  },
}));

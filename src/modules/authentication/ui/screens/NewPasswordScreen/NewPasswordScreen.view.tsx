import { Typography } from "@components/Typography";
import { FC } from "react";
import { useNewPasswordScreen } from "./NewPasswordScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";
import ForgotPasswordSVG from "@images/forgot-password.svg";
import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";

export const NewPasswordScreen: FC = () => {
  const { validateNewPassword } = useNewPasswordScreen();
  return (
    <>
      <View style={styles.container}>
        <ForgotPasswordSVG />
        <View style={styles.textContainer}>
          <Typography.Header size="large">
            Nouveau mot de passe
          </Typography.Header>
          <Typography.Body size="small">
            Le nouveau mot de passe doit être suffisant long et complexe.
          </Typography.Body>
          <TextInput placeholder="Mot de passe" secureTextEntry />
          <TextInput placeholder="Confirmer le mot de passe" secureTextEntry />
          <Button fullWidth onPress={validateNewPassword}>
            <Button.Label label="Valider mon nouveau mot de passe" />
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    height: "100%",
    width: "100%",
    paddingTop: 24,
  },
  svg: {
    marginHorizontal: "auto",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
  },
}));

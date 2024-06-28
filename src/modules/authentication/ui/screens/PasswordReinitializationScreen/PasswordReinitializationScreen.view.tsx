import { Typography } from "@components/Typography";
import { FC } from "react";
import { usePasswordReinitializationScreen } from "./PasswordReinitializationScreen.controller";
import ForgotPasswordSVG from "@images/forgot-password.svg";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";

export const PasswordReinitializationScreen: FC = () => {
  const { sendEmailForForgotPassword } = usePasswordReinitializationScreen();

  return (
    <>
      <View style={styles.container}>
        <ForgotPasswordSVG />
        <View style={styles.textContainer}>
          <Typography.Header size="large">
            Réinitialiser votre mot de passe
          </Typography.Header>
          <Typography.Body size="small">
            Entrez l’adresse mail utilisé lors de votre inscription pour
            recevoir le lien de réinitialisation.
          </Typography.Body>
          <TextInput placeholder="Adresse mail" />
          <Button fullWidth onPress={sendEmailForForgotPassword}>
            <Button.Label label="M'envoyer le mail" />
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

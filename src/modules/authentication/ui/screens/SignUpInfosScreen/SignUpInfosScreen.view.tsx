import { Typography } from "@components/Typography";
import { TextInput } from "@components/TextInput";
import { View } from "react-native";
import { Button } from "@components/Button";
import { SocialButton } from "@/src/components/SocialButton";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useSignUpInfosScreen } from "./SignUpInfosScreen.controller";
import { FC } from "react";

export const SignUpInfosScreen: FC = () => {
  const { goToLoginScreen, registerNewUser } = useSignUpInfosScreen();

  return (
    <View style={styles.container}>
      <Typography.Header size="large">Inscription</Typography.Header>
      <TextInput placeholder="Prénom" />
      <TextInput placeholder="Nom" />
      <TextInput placeholder="Adresse e-mail" keyboardType="email-address" />
      <TextInput placeholder="Mot de passe" secureTextEntry />
      <Button fullWidth onPress={registerNewUser}>
        <Button.Label label="S'inscrire" />
      </Button>
      <SocialButton network="google" />
      <SocialButton network="apple" />
      <Button fullWidth variant="text" onPress={goToLoginScreen}>
        <Button.Label label="Vous avez déjà un compte ?" />
        <Button.Label label="Connectez-vous !" bold />
      </Button>
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
    padding: 25,
    gap: 16,
  },
}));

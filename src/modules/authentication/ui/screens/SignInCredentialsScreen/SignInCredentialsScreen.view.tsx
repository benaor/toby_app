import { FC } from "react";
import { useSignInCredentialsScreen } from "./SignInCredentialsScreen.controller";
import { View } from "react-native";
import { Typography } from "@components/Typography";
import GuyOpenShuttersSVG from "@images/guy-open-shutters.svg";
import { createStyleSheet } from "@themes/createStyleSheet";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";
import { useTheme } from "@themes/useTheme";
import { SocialButton } from "@components/SocialButton";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";

export const SignInCredentialsScreen: FC = () => {
  const { goToSignUpScreen, goToForgetPasswordScreen } =
    useSignInCredentialsScreen();
  const { colors } = useTheme();
  const { signInWithEmail } = useAuthentication();

  return (
    <View style={styles.container}>
      <GuyOpenShuttersSVG style={styles.svg} />
      <View style={styles.textContainer}>
        <Typography.Header size="large">Connexion</Typography.Header>
        <TextInput placeholder="Adresse mail" />
        <TextInput placeholder="Mot de passe" secureTextEntry />
        <Button fullWidth variant="text" onPress={goToForgetPasswordScreen}>
          <Button.Label
            colors={["primary", "medium"]}
            label="Mot de passe perdu?"
          />
        </Button>
        <Button fullWidth onPress={signInWithEmail}>
          <Button.Label colors={["typography", "low"]} label="Se connecter" />
          <Button.Icon name="arrowright" color={colors.typography.low} />
        </Button>
        <SocialButton network="google" />
        <SocialButton network="apple" />
        <Button fullWidth variant="text" onPress={goToSignUpScreen}>
          <Button.Label label="Vous n'avez pas de compte ?" />
          <Button.Label label="Inscrivez-vous !" bold />
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
  },
  svg: {
    marginHorizontal: "auto",
  },
  textContainer: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
}));

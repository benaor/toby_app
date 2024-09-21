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

export const SignInCredentialsScreen: FC = () => {
  const {
    goToSignUpScreen,
    goToForgetPasswordScreen,
    signIn,
    handleEmailChange,
    handlePasswordChange,
    credentials,
  } = useSignInCredentialsScreen();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <GuyOpenShuttersSVG style={styles.svg} />
      <View style={styles.textContainer}>
        <Typography.Header size="large">Connexion</Typography.Header>
        <TextInput
          placeholder="Adresse mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={credentials.email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          value={credentials.password}
          onChangeText={handlePasswordChange}
        />
        <Button fullWidth variant="text" onPress={goToForgetPasswordScreen}>
          <Button.Label
            colors={["primary", "medium"]}
            label="Mot de passe perdu?"
          />
        </Button>
        <Button fullWidth onPress={signIn}>
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

import { FC } from "react";
import { useChangePasswordSuccessScreen } from "./ChangePasswordSuccessScreen.controller";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import ForgotPasswordSVG from "@images/forgot-password.svg";
import { View } from "react-native";
import { Button } from "@components/Button";

export const ChangePasswordSuccessScreen: FC = () => {
  const { goToSignInScreen } = useChangePasswordSuccessScreen();
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <ForgotPasswordSVG />
        <View style={styles.textContainer}>
          <Typography.Header size="large">C’est tout bon !</Typography.Header>
          <Typography.Body size="small">
            Votre mot de passe a été réinitialisé, vous pouvez vous connecter.
          </Typography.Body>
          <Button fullWidth variant="text">
            <Button.Icon name="checkcircle" color={colors.primary.medium} />
            <Button.Label
              label="Mot de passe réinitialisé !"
              colors={["primary", "high"]}
            />
          </Button>
          <Button fullWidth onPress={goToSignInScreen}>
            <Button.Label label="Se connecter" />
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

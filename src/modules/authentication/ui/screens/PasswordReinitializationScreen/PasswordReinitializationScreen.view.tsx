import { Typography } from "@components/Typography";
import { FC } from "react";
import { usePasswordReinitializationScreen } from "./PasswordReinitializationScreen.controller";
import ForgotPasswordSVG from "@images/forgot-password.svg";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

export const PasswordReinitializationScreen: FC = () => {
  const presenter = usePasswordReinitializationScreen();

  return (
    <>
      <View style={styles.container}>
        <ForgotPasswordSVG />
        <Typography.Header size="large">
          Réinitialiser votre mot de passe
        </Typography.Header>
      </View>
    </>
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
}));

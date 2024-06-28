import { Typography } from "@components/Typography";
import { FC } from "react";
import { useCheckMailScreen } from "./CheckMailScreen.controller";
import ForgotPasswordSVG from "@images/forgot-password.svg";
import { View } from "react-native";
import { Button } from "@components/Button";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";

export const CheckMailScreen: FC = () => {
  const { confirmEmailReception } = useCheckMailScreen();
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <ForgotPasswordSVG />
        <View style={styles.textContainer}>
          <Typography.Header size="large">
            Vérifiez votre boite mail
          </Typography.Header>
          <Typography.Body size="small">
            Un mail vient d’être envoyé à l’adresse mail que vous avez indiqué.
          </Typography.Body>
          <Button fullWidth onPress={confirmEmailReception}>
            <Button.Icon name="checkcircle" color={colors.typography.low} />
            <Button.Label label="E-mail envoyé !" />
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

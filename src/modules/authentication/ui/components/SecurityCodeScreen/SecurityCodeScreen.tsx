import { Typography } from "@components/Typography";
import { useTheme } from "@themes/useTheme";
import { createStyleSheet } from "@themes/createStyleSheet";
import React, { FC } from "react";
import { View } from "react-native";
import CodeSecureSVG from "@images/code-secure.svg";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";

type SecurityCodeScreenProps = {
  onValidate: () => void;
};

export const SecurityCodeScreen: FC<SecurityCodeScreenProps> = ({
  onValidate,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <CodeSecureSVG />
      <View style={styles.textContainer}>
        <Typography.Header size="large">Code de sécurité</Typography.Header>
        <Typography.Body>
          Saisissez le code de sécurité que vous venez de recevoir sur votre
          adresse mail.
        </Typography.Body>
        <TextInput keyboardType="decimal-pad" placeholder="Code de sécurité" />
        <Button fullWidth onPress={onValidate}>
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

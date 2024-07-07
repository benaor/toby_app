import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { FC } from "react";
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
} from "react-native";
import { View } from "react-native";

type TextInputProps = Omit<RNTextInputProps, ""> & {
  label?: string;
  variant?: "outlined" | "filled";
  textarea?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  textarea,
  variant = "outlined",
  ...props
}) => {
  const variantStyles = createStyleSheet((theme) => ({
    input: {
      backgroundColor:
        variant === "outlined" ? "transparent" : theme.colors.background.medium,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderRadius: variant === "outlined" ? 4 : 10,
      minHeight: textarea ? 130 : 46,
    },
  }));

  if (label)
    return (
      <View style={styles.container}>
        <Typography.Body>{label}</Typography.Body>
        <RNTextInput {...props} style={[styles.input, variantStyles.input]} />
      </View>
    );

  return <RNTextInput {...props} style={[styles.input, variantStyles.input]} />;
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderColor: theme.colors.border.medium,
    borderWidth: 1,
    padding: 15,
    borderRadius: 4,
    color: theme.colors.typography.high,
  },
}));

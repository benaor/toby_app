import { createStyleSheet } from "@themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { FC } from "react";
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { View } from "react-native";

type TextInputProps = RNTextInputProps & {
  variant?: "outlined" | "filled";
  textarea?: boolean;
  label?: string;
  error?: string | null;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  error,
  textarea,
  style,
  inputStyle,
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
      inputStyle,
    },
  }));

  return (
    <View style={[styles.container, style]}>
      {label && <Typography.Body>{label}</Typography.Body>}
      <RNTextInput {...props} style={[styles.input, variantStyles.input]} />
      {error && <Typography.Body color="primary">{error}</Typography.Body>}
    </View>
  );
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

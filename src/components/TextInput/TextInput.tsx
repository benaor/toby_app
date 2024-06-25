import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { FC } from "react";
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
} from "react-native";

type TextInputProps = Omit<RNTextInputProps, "">;

export const TextInput: FC<TextInputProps> = (props) => {
  return <RNTextInput {...props} style={styles.input} />;
};

const styles = createStyleSheet((theme) => ({
  input: {
    borderColor: theme.colors.border.medium,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    color: theme.colors.typography.high,
  },
}));

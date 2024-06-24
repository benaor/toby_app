import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { FC, PropsWithChildren } from "react";
import { Pressable, PressableProps } from "react-native";
import { Typography } from "../Typography";

type ButtonProps = PropsWithChildren<
  Pick<PressableProps, "onPress" | "onPressIn"> & {}
>;

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Pressable style={styles.container} {...rest}>
      {children}
    </Pressable>
  );
}

const Label: FC<{ label: string }> = ({ label }) => {
  return (
    <Typography.Body color="background" lvlColor="low">
      {label}
    </Typography.Body>
  );
};

Button.Label = Label;

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.primary.high,
    paddingVertical: 12,
    paddingHorizontal: 66,
    borderRadius: 10,
    overflow: "hidden",
  },
}));

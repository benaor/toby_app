import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps } from "react-native";
import { Label } from "./Button.Label";
import { ButtonProvider } from "./useButtonProps";
import { useTheme } from "@/src/themes/useTheme";

export type ButtonProps = PropsWithChildren<
  Pick<PressableProps, "onPress" | "onPressIn"> & {
    variant?: "contained" | "text";
  }
>;

export function Button({
  children,
  onPress,
  onPressIn,
  variant = "contained",
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const computeBgColor = () => {
    switch (variant) {
      case "text":
        return theme.colors.background.low;
      case "contained":
      default:
        return theme.colors.primary.high;
    }
  };

  const styles = createStyleSheet(() => ({
    container: {
      backgroundColor: computeBgColor(),
      paddingVertical: 12,
      paddingHorizontal: 66,
      borderRadius: 10,
      overflow: "hidden",
    },
  }));

  return (
    <ButtonProvider props={{ variant, ...props }}>
      <Pressable
        style={styles.container}
        onPress={onPress}
        onPressIn={onPressIn}
      >
        {children}
      </Pressable>
    </ButtonProvider>
  );
}

Button.Label = Label;

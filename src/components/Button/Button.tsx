import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { Label } from "./Button.Label";
import { ButtonProvider } from "./useButtonProps";
import { useTheme } from "@/src/themes/useTheme";
import { ColorLevel, ColorName } from "@/src/themes/theme";
import { Icon } from "./Button.Icon";

export type ButtonContextProps = PropsWithChildren<
  Pick<PressableProps, "onPress" | "onPressIn" | "onPressOut"> & {
    variant?: "contained" | "text";
    fullWidth?: boolean;
    color?: ColorName;
    lvlColor?: ColorLevel;
  }
>;

type ButtonProps = ButtonContextProps & {
  style?: StyleProp<ViewStyle>;
};

export function Button({
  children,
  onPress,
  onPressIn,
  onPressOut,
  style = {},
  color,
  lvlColor,
  variant = "contained",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const computeBgColor = () => {
    switch (variant) {
      case "text":
        return theme.colors[color ?? "background"][lvlColor ?? "low"];
      case "contained":
      default:
        return theme.colors[color ?? "primary"][lvlColor ?? "high"];
    }
  };

  const styles = createStyleSheet(() => ({
    container: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: computeBgColor(),
      paddingVertical: 12,
      paddingHorizontal: 66,
      borderRadius: fullWidth ? 4 : 10,
      overflow: "hidden",
      width: fullWidth ? "100%" : "auto",
    },
  }));

  return (
    <ButtonProvider props={{ variant, ...props }}>
      <Pressable
        style={[styles.container, style]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {children}
      </Pressable>
    </ButtonProvider>
  );
}

Button.Label = Label;
Button.Icon = Icon;

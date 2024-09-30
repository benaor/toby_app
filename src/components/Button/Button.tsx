import { createStyleSheet } from "@themes/createStyleSheet";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { Label } from "./Button.Label";
import { ButtonProvider } from "./useButtonProps";
import { useTheme } from "@themes/useTheme";
import { ColorLevel, ColorName } from "@themes/theme";
import { Icon } from "./Button.Icon";

type WidthProps =
  | {
      fullWidth?: boolean;
      width?: never;
    }
  | {
      fullWidth?: never;
      width?: number;
    };

export type ButtonContextProps = PropsWithChildren<
  Pick<PressableProps, "onPress" | "onPressIn" | "onPressOut" | "disabled"> & {
    variant?: "contained" | "text";
    color?: ColorName;
    lvlColor?: ColorLevel;
  } & WidthProps
>;

type ButtonProps = ButtonContextProps & {
  style?: StyleProp<ViewStyle>;
};

export function Button({
  children,
  onPress,
  onPressIn,
  onPressOut,
  style,
  color,
  lvlColor,
  disabled,
  variant = "contained",
  fullWidth = false,
  width,
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
      gap: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: computeBgColor(),
      paddingVertical: 12,
      paddingHorizontal: fullWidth ? 0 : width ? 0 : 66,
      borderRadius: fullWidth ? 4 : 10,
      overflow: "hidden",
      width: fullWidth ? "100%" : width ?? "auto",
    },
  }));

  return (
    <ButtonProvider props={{ variant, ...props }}>
      <Pressable
        style={[styles.container, style]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
      >
        {disabled && <Icon name="lock" />}
        {children}
      </Pressable>
    </ButtonProvider>
  );
}

Button.Label = Label;
Button.Icon = Icon;

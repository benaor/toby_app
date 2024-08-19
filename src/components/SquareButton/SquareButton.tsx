import { FC, ReactNode, useMemo } from "react";
import { Pressable, PressableProps } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";

type SquareButtonProps = PressableProps & {
  size?: "small" | "medium" | "large";
  children: ReactNode;
};

export const SquareButton: FC<SquareButtonProps> = ({
  size = "medium",
  children,
  ...pressableProps
}) => {
  const width = useMemo(() => {
    if (size === "small") return 50;
    if (size === "medium") return 75;
    if (size === "large") return 90;
  }, [size]);

  const height = width;

  const computedStyles = createStyleSheet(() => ({
    container: {
      ...styles.container,
      width,
      height,
    },
  }));
  return (
    <Pressable {...pressableProps} style={computedStyles.container}>
      {children}
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    backgroundColor: theme.colors.background.low,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 8,
  },
}));

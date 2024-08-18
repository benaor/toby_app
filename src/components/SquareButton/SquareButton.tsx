import { FC, ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";

type SquareButtonProps = PressableProps & {
  children: ReactNode;
};

export const SquareButton: FC<SquareButtonProps> = ({
  children,
  ...pressableProps
}) => {
  return (
    <Pressable {...pressableProps} style={styles.container}>
      {children}
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    borderRadius: 5,
    display: "flex",
    width: 77,
    height: 65,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 5,
  },
}));

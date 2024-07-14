import { FC } from "react";
import { ColorValue, Pressable, PressableProps } from "react-native";
import { Typography } from "..";
import { Icon, IconProps } from "@components/Icon/Icon";
import { createStyleSheet } from "@themes/createStyleSheet";

type IconButtonProps = PressableProps & {
  name: IconProps["name"];
  size?: IconProps["size"];
  iconColor?: IconProps["color"];
  backgroundColor?: ColorValue;
};

export const IconButton: FC<IconButtonProps> = ({
  name,
  size = 24,
  iconColor,
  backgroundColor,
  ...pressableProps
}) => {
  const styles = createStyleSheet(() => ({
    container: {
      backgroundColor: backgroundColor ?? "transparent",
      borderRadius: 50,
      padding: 5,
    },
  }));

  return (
    <Pressable style={styles.container} {...pressableProps}>
      <Typography.Body>
        <Icon name={name} size={size} color={iconColor} />
      </Typography.Body>
    </Pressable>
  );
};

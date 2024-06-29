import { IconListFromExpo } from "@components/Button/IconListFromExpo.type";
import { AntDesign } from "@expo/vector-icons";
import { ColorAndLevelTuple } from "@themes/theme";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";
import { Pressable, PressableProps } from "react-native";
import { Typography } from "..";

type IconButtonProps = PressableProps & {
  name: IconListFromExpo;
  colors?: ColorAndLevelTuple;
  size?: number;
};

export const IconButton: FC<IconButtonProps> = ({
  name,
  size = 24,
  colors,
  ...pressableProps
}) => {
  const [color, level] = colors ?? ["typography", "high"];

  const theme = useTheme();

  return (
    <Pressable {...pressableProps}>
      <Typography.Body>
        <AntDesign name={name} size={size} color={theme.colors[color][level]} />
      </Typography.Body>
    </Pressable>
  );
};

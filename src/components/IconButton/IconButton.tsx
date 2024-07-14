import type { IconListFromExpo } from "@utils/icons/IconListFromExpo";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ColorAndLevelTuple } from "@themes/theme";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";
import { Pressable, PressableProps } from "react-native";
import { Typography } from "..";
import { isAntDesignIcon } from "@utils/icons/isAntDesignIcon";
import { isFontAwesomeIcon } from "@utils/icons/isFontAwesomeIcon";

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
  const iconColor = theme.colors[color][level];

  const IconFromExpoFacade = () => {
    if (isAntDesignIcon(name))
      return <AntDesign name={name} size={size} color={iconColor} />;

    if (isFontAwesomeIcon(name))
      return <FontAwesome name={name} size={size} color={iconColor} />;

    throw new Error(
      "property name must be an AntDesign or Fontawesome icons name",
    );
  };

  return (
    <Pressable {...pressableProps}>
      <Typography.Body>
        <IconFromExpoFacade />
      </Typography.Body>
    </Pressable>
  );
};

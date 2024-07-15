import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@themes/useTheme";
import { IconListFromExpo } from "@utils/icons/IconListFromExpo";
import { isAntDesignIcon } from "@utils/icons/isAntDesignIcon";
import { isFontAwesomeIcon } from "@utils/icons/isFontAwesomeIcon";
import { isMaterialIconsIcon } from "@utils/icons/isMaterialIconsIcon";
import { FC } from "react";
import { ColorValue } from "react-native";

export type IconProps = {
  name: IconListFromExpo;
  size?: number;
  color?: ColorValue;
};

export const Icon: FC<IconProps> = ({ name, color, size }) => {
  const theme = useTheme();
  const iconColor = color ?? theme.colors.typography.high;

  if (isAntDesignIcon(name))
    return <AntDesign name={name} size={size} color={iconColor} />;
  if (isFontAwesomeIcon(name))
    return <FontAwesome name={name} size={size} color={iconColor} />;
  if (isMaterialIconsIcon(name))
    return <MaterialIcons name={name} size={size} color={iconColor} />;
  else
    throw new Error(
      "property name must be an AntDesign or Fontawesome icons name",
    );
};

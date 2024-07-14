import { FC } from "react";
import { IconListFromExpo } from "../../utils/icons/IconListFromExpo";
import { ColorValue } from "react-native";
import { Icon as IconComponent } from "@components/Icon";

type BtnIconProps = {
  name: IconListFromExpo;
  color?: ColorValue;
};

export const Icon: FC<BtnIconProps> = ({ name, color }) => {
  return <IconComponent name={name} size={20} color={color} />;
};

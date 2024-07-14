import { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { IconListFromAntDesign } from "../../utils/icons/IconListFromExpo";
import { ColorValue } from "react-native";

type BtnIconProps = {
  name: IconListFromAntDesign;
  color?: ColorValue;
};

export const Icon: FC<BtnIconProps> = ({ name, color }) => {
  return <AntDesign name={name} size={20} color={color} />;
};

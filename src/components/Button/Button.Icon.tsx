import { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { IconListFromExpo } from "./IconListFromExpo.type";
import { ColorValue } from "react-native";

type BtnIconProps = {
  name: IconListFromExpo;
  color?: ColorValue;
};

export const Icon: FC<BtnIconProps> = ({ name, color }) => {
  return <AntDesign name={name} size={20} color={color} />;
};

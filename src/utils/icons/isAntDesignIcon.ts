import { AntDesign } from "@expo/vector-icons";
import { AntDesignIconName } from "./IconListFromExpo";

export const isAntDesignIcon = (
  iconName: string,
): iconName is AntDesignIconName => iconName in AntDesign.glyphMap;

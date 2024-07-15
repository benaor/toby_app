import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIconName } from "./IconListFromExpo";

export const isFontAwesomeIcon = (
  iconName: string,
): iconName is FontAwesomeIconName => iconName in FontAwesome.glyphMap;

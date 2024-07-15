import { MaterialIcons } from "@expo/vector-icons";
import { MaterialIconsIconName } from "./IconListFromExpo";

export const isMaterialIconsIcon = (
  icon: string,
): icon is MaterialIconsIconName => icon in MaterialIcons.glyphMap;

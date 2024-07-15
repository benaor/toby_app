import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;
export type AntDesignIconName = keyof typeof AntDesign.glyphMap;
export type MaterialIconsIconName = keyof typeof MaterialIcons.glyphMap;

export type IconListFromExpo =
  | AntDesignIconName
  | FontAwesomeIconName
  | MaterialIconsIconName;

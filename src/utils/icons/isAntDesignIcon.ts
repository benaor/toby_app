import {
  iconListFromAntDesign,
  IconListFromAntDesign,
} from "./IconListFromExpo";

export const isAntDesignIcon = (
  iconName: string,
): iconName is IconListFromAntDesign => {
  return iconListFromAntDesign.includes(iconName as any);
};

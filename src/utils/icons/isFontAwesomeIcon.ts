import {
  iconListFromFontAwesome,
  IconListFromFontAwesome,
} from "./IconListFromExpo";

export const isFontAwesomeIcon = (
  iconName: string,
): iconName is IconListFromFontAwesome => {
  return iconListFromFontAwesome.includes(iconName as never);
};

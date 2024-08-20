import { createStyleSheet } from "@themes/createStyleSheet";
import {
  ColorName,
  ColorLevel,
  FontBodySize,
  FontHeaderSize,
} from "@themes/theme";
import { FC, ReactNode } from "react";
import { Text, TextStyle } from "react-native";

/**
 * Typography Common Props
 */
export type TypographyBaseProps = {
  children: ReactNode;
  size?: FontHeaderSize;
  bold?: boolean;
  color?: ColorName;
  lvlColor?: ColorLevel;
  textAlign?: TextStyle["textAlign"];
  style?: TextStyle;
};

/**
 * Typography Variant Header
 */
export type TypographyHeaderProps = TypographyBaseProps;

const Header: FC<TypographyHeaderProps> = ({
  children,
  textAlign,
  style,
  size = "medium",
  color = "typography",
  lvlColor = "high",
}) => {
  const styles = createStyleSheet((theme) => ({
    text: {
      fontFamily: theme.fonts.family.default,
      color: theme.colors[color][lvlColor],
      fontWeight: "bold",
      fontSize: theme.fonts.header[size].size,
      textAlign: textAlign,
      ...style,
    },
  }));

  return <Text style={styles.text}>{children}</Text>;
};

/**
 * Typography Variant Body
 */

export type TypographyBodyProps = TypographyBaseProps & {
  bold?: boolean;
  size?: FontBodySize;
};

const Body: FC<TypographyBodyProps> = ({
  children,
  bold,
  textAlign,
  style,
  size = "medium",
  color = "typography",
  lvlColor = "high",
}) => {
  const styles = createStyleSheet((theme) => ({
    text: {
      fontFamily: theme.fonts.family.default,
      color: theme.colors[color][lvlColor],
      fontWeight: bold ? "bold" : "normal",
      fontSize: theme.fonts.body[size].size,
      textAlign: textAlign,
      ...style,
    },
  }));

  return <Text style={styles.text}>{children}</Text>;
};

export const Typography = { Header, Body };

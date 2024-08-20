/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";
import { AppTheme, theme } from "./theme";

type StyleBuilder<T> = (theme: AppTheme) => T & StyleSheet.NamedStyles<T>;

const createStyleSheetBuilder =
  (theme: AppTheme) =>
  <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styleBuilder: StyleBuilder<T>,
  ): T => {
    const styles = styleBuilder(theme);
    return StyleSheet.create(styles);
  };

export const createStyleSheet = createStyleSheetBuilder(theme);

import { StyleSheet } from "react-native";
import { AppTheme, theme } from "./theme";

type StyleBuilder<T> =
  | ((theme: AppTheme) => T & StyleSheet.NamedStyles<unknown>)
  | (T & StyleSheet.NamedStyles<unknown>);

const createStyleSheetBuilder =
  (theme: AppTheme) =>
  <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<unknown>>(
    styleBuilder: StyleBuilder<T>,
  ): T => {
    const styles =
      typeof styleBuilder === "function" ? styleBuilder(theme) : styleBuilder;
    return StyleSheet.create(styles);
  };

export const createStyleSheet = createStyleSheetBuilder(theme);

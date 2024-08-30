import { PropsWithChildren, createContext, useContext } from "react";
import { AppTheme, theme } from "./theme";

const ThemeContext = createContext<AppTheme>(theme);

export const ThemeProvider: React.FC<
  PropsWithChildren<{
    theme: AppTheme;
  }>
> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);

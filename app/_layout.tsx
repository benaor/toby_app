import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaView } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { ThemeProvider } from "@themes/useTheme";
import { theme } from "@themes/theme";
import { FeatureFlagProvider } from "@/src/ui/contexts/useFeatureFlag";

import { AuthContextProvider } from "@authentication/ui/hooks/useAuthentication";
import { Provider } from "react-redux";
import { app } from "@app/main";
import { DependenciesProvider } from "@app/react/useDependencies";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Noto Sans": require("../assets/fonts/NotoSans-Variable.ttf"),
    "Noto Sans Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={app.store}>
      <ThemeProvider theme={theme}>
        <DependenciesProvider>
          <AuthContextProvider>
            <FeatureFlagProvider>
              <SafeAreaView style={styles.container}>
                <Slot />
              </SafeAreaView>
            </FeatureFlagProvider>
          </AuthContextProvider>
        </DependenciesProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = createStyleSheet((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background.low,
  },
}));

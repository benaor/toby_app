import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaView } from "react-native";
import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { ThemeProvider } from "@theme/useTheme";
import { theme } from "@theme/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = createStyleSheet((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background.low,
  },
}));

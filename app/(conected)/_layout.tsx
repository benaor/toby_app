import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect, Stack } from "expo-router";

export default function ConnectedLayout() {
  const { isConnected } = useAuthentication();

  if (!isConnected) return <Redirect href="onboarding" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="event" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

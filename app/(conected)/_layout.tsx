import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect, Stack } from "expo-router";

export default function ConnectedLayout() {
  const { isDisconnected } = useAuthentication();

  if (isDisconnected) return <Redirect href="onboarding" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

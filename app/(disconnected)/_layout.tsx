import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect, Stack } from "expo-router";

export default function DisconnectedLayout() {
  const { session } = useAuthentication();

  if (session) return <Redirect href={screens.routes.home} />;

  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    </Stack>
  );
}

import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/ui/hooks/useAuthentication";
import { Redirect, Stack } from "expo-router";

export default function DisconnectedLayout() {
  const { session } = useAuthentication();

  if (session) return <Redirect href="home" />;

  return (
    <Stack>
      <Stack.Screen
        name={screens.onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={screens.signIn} options={{ headerShown: false }} />
      <Stack.Screen name={screens.signUp} options={{ headerShown: false }} />
      <Stack.Screen
        name={screens.forgotPassword}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

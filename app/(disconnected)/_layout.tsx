import { screens } from "@/src/constants/screens";
import { useAuthentication } from "@authentication/useAuthentication";
import { Redirect, Stack } from "expo-router";

export default function DisconnectedLayout() {
  const { isConnected } = useAuthentication();

  if (isConnected) return <Redirect href="home" />;

  return (
    <Stack>
      <Stack.Screen
        name={screens.onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={screens.signIn} options={{ headerShown: false }} />
      <Stack.Screen name={screens.signUp} options={{ headerShown: false }} />
    </Stack>
  );
}

import { useAuthentication } from "@/src/useAuthentication.hook";
import { Redirect, Stack } from "expo-router";

export default function DisconnectedLayout() {
  const { isConnected } = useAuthentication();

  if (isConnected) return <Redirect href="home" />;

  return (
    <Stack>
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}

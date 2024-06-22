import { useAuthentication } from "@/src/useAuthentication.hook";
import { Redirect, Stack } from "expo-router";

export default function ConnectedLayout() {
  const { isDisconnected } = useAuthentication();

  if (isDisconnected) return <Redirect href="onboarding" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function EventIdLayout() {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="summary" options={{ headerShown: false }} />
    </Stack>
  );
}

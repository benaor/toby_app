import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="events" options={{ headerShown: false }} />
      <Stack.Screen name="archives" options={{ headerShown: false }} />
    </Stack>
  );
}

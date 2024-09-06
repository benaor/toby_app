import { EventSettingsScreen } from "@/src/modules/events/ui/screens/EventSettingsScreen";
import { useGlobalSearchParams } from "expo-router";

export default function EventSettingsLayout() {
  const { id } = useGlobalSearchParams<{ id: string }>();

  // TODO Redirect to 404 page
  if (!id) return null;

  return <EventSettingsScreen />;
}

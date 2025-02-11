import { EditGuestsModal } from "@/src/modules/events/ui/screens/EditGuestsModal";
import { Redirect, useGlobalSearchParams } from "expo-router";

export default function EditGuestsEventModal() {
  const { id } = useGlobalSearchParams<{ id: string }>();

  if (!id) return <Redirect href="/+not-found" />;

  return <EditGuestsModal eventId={id} />;
}

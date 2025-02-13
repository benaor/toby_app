import { EditDateModal } from "@/src/modules/events/ui/screens/EditDateModal";
import { Redirect, useGlobalSearchParams } from "expo-router";

export default function EditDateEventModal() {
  const { id } = useGlobalSearchParams<{ id: string }>();

  if (!id) return <Redirect href="/+not-found" />;

  return <EditDateModal eventId={id} />;
}

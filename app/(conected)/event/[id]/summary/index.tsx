import { EventSummaryScreen } from "@/src/modules/events/ui/screens/EventSummaryScreen/EventSummaryScreen.view";
import { Redirect, useGlobalSearchParams } from "expo-router";

export default function EventSummary() {
  const { id } = useGlobalSearchParams<{ id: string }>();

  // TODO Redirect to 404 page
  if (!id) return <Redirect href="/+not-found" />;

  return <EventSummaryScreen eventId={id} />;
}

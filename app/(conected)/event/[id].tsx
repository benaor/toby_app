import { ChatScreen } from "@/src/modules/chat/ui/screens/ChatScreen";
import { useGlobalSearchParams } from "expo-router";

export default function EventScreen() {
  const { id } = useGlobalSearchParams<{ id: string }>();

  // TODO Redirect to 404 page
  if (!id) return null;

  return <ChatScreen eventId={id} />;
}

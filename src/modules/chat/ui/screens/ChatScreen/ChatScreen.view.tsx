import { FC, useMemo } from "react";
import { useChatScreen } from "./ChatScreen.controller";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Header } from "@components/Header";
import { ChatBar } from "@components/ChatBar";

type ChatScreenProps = {
  eventId: string;
};

export const ChatScreen: FC<ChatScreenProps> = ({ eventId }) => {
  const { event } = useChatScreen(eventId);

  const nbParticipants = event.guests.length;

  const subtitle = useMemo(
    () => nbParticipants + " participant" + (nbParticipants > 1 ? "s" : ""),
    [nbParticipants],
  );

  return (
    <View style={styles.container}>
      <Header
        title={event.title}
        subtitle={subtitle}
        button="infocirlce"
        onButtonPress={() => {}}
      />
      <ChatBar />
    </View>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 30,
    width: "100%",
    height: "100%",
  },
}));

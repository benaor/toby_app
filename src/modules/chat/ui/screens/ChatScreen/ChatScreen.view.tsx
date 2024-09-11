import { FC, useMemo } from "react";
import { useChatScreen } from "./ChatScreen.controller";
import { ScrollView, View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Header } from "@components/Header";
import { ChatBar } from "@components/ChatBar";
import { MessageCard } from "../../components/MessageCard";

type ChatScreenProps = {
  eventId: string;
};

export const ChatScreen: FC<ChatScreenProps> = ({ eventId }) => {
  const { event, messages, userId, goToEventSummary } = useChatScreen(eventId);

  const nbParticipants = event.guests.length;

  const subtitle = useMemo(
    () => nbParticipants + " participant" + (nbParticipants > 1 ? "s" : ""),
    [nbParticipants],
  );

  return (
    <View style={styles.container}>
      <Header
        canGoBack
        title={event.title}
        subtitle={subtitle}
        button="infocirlce"
        onButtonPress={goToEventSummary}
      />
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        automaticallyAdjustKeyboardInsets
      >
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message.content}
            author={message.author}
            isMyMessage={message.author.id === userId}
          />
        ))}
      </ScrollView>
      <ChatBar />
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 30,
    paddingHorizontal: 20,
    paddingBottom: 80,
    paddingTop: 20,
    backgroundColor: theme.colors.backgroundBis.medium,
  },
}));

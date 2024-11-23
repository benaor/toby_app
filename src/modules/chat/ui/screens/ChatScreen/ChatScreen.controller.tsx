import { useCallback } from "react";
import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { UserEvent } from "@events/core/models/Event.model";
import { Message } from "../../../core/message.model";
import { EventFactory } from "@events/core/models/Event.factory";

export const useChatScreen = (eventId: string) => {
  const { navigate } = useRouter();
  const userId = "2";

  const event: UserEvent = EventFactory.EVENT({
    id: "1",
    image: "https://picsum.photos/204",
    title: "Anniversaire Marco",
    start: new Date().toISOString(),
    end: null,
    guests: ["John", "Doe"],
    notification: {
      count: 1,
    },
    isAdmin: true,
  });

  const messages: Message[] = [
    {
      id: "1",
      content: "Hey, comment ça va ?",
      author: {
        id: "1",
        name: "John",
        avatar: "https://picsum.photos/200",
      },
    },
    {
      id: "2",
      content: "Ça va bien, merci ! Et toi ?",
      author: {
        id: "2",
        name: "Jane",
        avatar: "https://picsum.photos/201",
      },
    },
    {
      id: "3",
      content: "Je vais bien aussi, merci !",
      author: {
        id: "1",
        name: "John",
        avatar: "https://picsum.photos/202",
      },
    },
    {
      id: "4",
      content:
        "Qu'est-ce que tu fais de beau ? J'ai vu que tu étais en vacances en Inde ! On y est allé l'année dernière, c'était génial !",
      author: {
        id: "3",
        name: "Alice",
        avatar: "https://picsum.photos/203",
      },
    },
    {
      id: "5",
      content: "Rien de spécial, je me repose.",
      author: {
        id: "2",
        name: "Jane",
        avatar: "https://picsum.photos/201",
      },
    },
    {
      id: "6",
      content: "Et toi ?",
      author: {
        id: "2",
        name: "Jane",
        avatar: "https://picsum.photos/201",
      },
    },
    {
      id: "7",
      content: "I'm doing great! Just finished a new project.",
      author: {
        id: "2",
        name: "Jane",
        avatar: "https://picsum.photos/201",
      },
    },
    {
      id: "8",
      content: "That's awesome! What's the project about?",
      author: {
        id: "1",
        name: "John",
        avatar: "https://picsum.photos/200",
      },
    },
  ];

  const goToEventSummary = useCallback(
    () => navigate(screens.eventSummary(eventId)),
    [eventId, navigate],
  );
  return {
    event,
    messages,
    userId,
    goToEventSummary,
  };
};

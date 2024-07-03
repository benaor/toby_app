import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { useEventsList } from "./EventsList.controller";
import { EventCard } from "../EventCard";
import { NoEventText } from "../NoEventText";

export const EventsList: FC = () => {
  const { events } = useEventsList();

  return (
    <View style={styles.container}>
      {events.length === 0 ? (
        <NoEventText />
      ) : (
        events.map((event) => (
          <EventCard
            date={event.date}
            isAdmin={event.isAdmin}
            image={event.image}
            nbOfGuest={event.guests.length}
            title={event.title}
            nbOfNotification={event.notification.count}
          />
        ))
      )}
    </View>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
  },
}));

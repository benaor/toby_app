import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { ScrollView } from "react-native";
import { useEventsList } from "./EventsList.controller";
import { EventCard } from "../EventCard";
import { NoEventText } from "../NoEventText";
import { Typography } from "@components/Typography";

export const EventsList: FC = () => {
  const { events, isLoading, error, goToEvent } = useEventsList();

  if (isLoading) return <Typography.Body>Loading...</Typography.Body>; // TODO: Add a loading spinner
  if (error) return <Typography.Body>Error: {error}</Typography.Body>; // TODO: Add a retry button

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.length === 0 ? (
        <NoEventText />
      ) : (
        events.map((event) => (
          <EventCard
            key={event.id}
            date={new Date(event.start)}
            isAdmin={event.isAdmin}
            image={event.image}
            nbOfGuest={event.guests.length}
            title={event.title}
            nbOfNotification={event.notification.count}
            onPress={() => goToEvent(event.id)}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    paddingTop: 100,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
  },
}));

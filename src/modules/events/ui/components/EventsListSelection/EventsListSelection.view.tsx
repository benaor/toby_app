import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { ScrollView, View } from "react-native";
import { useEventsListSelection } from "./EventsListSelection.controller";
import { CheckBox } from "@components/Checkbox";
import { EventCard } from "../EventCard";
import { NoEventText } from "../NoEventText";
import { Typography } from "@components/Typography";

export const EventsListSelection: FC = () => {
  const { events, error, isLoading } = useEventsListSelection();

  if (isLoading) return <Typography.Body>Loading...</Typography.Body>; // TODO: Add a loading spinner
  if (error) return <Typography.Body>Error: {error}</Typography.Body>; // TODO: Add a retry button

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.length === 0 ? (
        <NoEventText />
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.checkableEventCard}>
            <View style={styles.checkboxContainer}>
              <CheckBox />
            </View>
            <EventCard
              date={new Date(event.start)}
              isAdmin={event.isAdmin}
              image={event.image}
              nbOfGuest={event.guests.length}
              title={event.title}
              nbOfNotification={event.notification.count}
              onPress={() => {}}
            />
          </View>
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
  checkableEventCard: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  checkboxContainer: {
    paddingLeft: 10,
    paddingRight: 30,
  },
}));

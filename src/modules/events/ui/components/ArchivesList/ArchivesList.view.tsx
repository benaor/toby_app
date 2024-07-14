import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { useArchivesList } from "./ArchivesList.controller";
import { EventCard } from "../EventCard";
import { NoEventText } from "../NoEventText";

export const ArchivesList: FC = () => {
  const { events } = useArchivesList();

  return (
    <View style={styles.container}>
      {events.length === 0 ? (
        <NoEventText />
      ) : (
        events.map((event) => (
          <EventCard
            key={event.id}
            date={event.date}
            image={event.image}
            nbOfGuest={event.guests.length}
            title={event.title}
            onPress={() => {}}
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

import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { useArchivesList } from "./ArchivesList.controller";
import { EventCard } from "../EventCard";
import { NoEventText } from "../NoEventText";
import { Typography } from "@components/Typography";

export const ArchivesList: FC = () => {
  const { archivedEvents, isLoading, error } = useArchivesList();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Typography.Body>Chargement ... </Typography.Body>
      </View>
    ); // TODO : add a loader

  if (error)
    return (
      <View style={styles.container}>
        <Typography.Body>Erreur : {error}</Typography.Body>
      </View>
    ); // TODO : add an error component

  return (
    <View style={styles.container}>
      {archivedEvents.length === 0 ? (
        <NoEventText />
      ) : (
        archivedEvents.map((event) => (
          <EventCard
            key={event.id}
            date={new Date(event.date.start)}
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

import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, View } from "react-native";
import { useEventsList } from "./EventsList.controller";
import { Typography } from "@components/Typography";
import { Button } from "@components/Button";
import { Chip } from "@components/Chip";
import { toHumanDate } from "@/src/utils/toHumanDate";

export const EventsList: FC = () => {
  const { events } = useEventsList();

  if (events.length === 0)
    return (
      <View style={styles.container}>
        <Typography.Header size="medium" color="primary" textAlign="center">
          Bienvenue !
        </Typography.Header>
        <Typography.Body textAlign="center">
          Créez dès maintenant votre premier évènement !
        </Typography.Body>
        <Button style={styles.button}>
          <Button.Label label="Créer un évènement" />
        </Button>
      </View>
    );

  return (
    <View style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Image source={{ uri: event.image }} style={styles.eventCardImage} />
          <View style={styles.eventCardInfos}>
            <View style={styles.badgeView}>
              {event.isAdmin ? <Chip type="text" label="Admin" /> : <View />}
              <Chip type="number" label={event.notification.count} />
            </View>
            <Typography.Header size="medium">{event.title}</Typography.Header>
            <Typography.Body>
              {event.guests.length} pers. | {toHumanDate(event.date)}
            </Typography.Body>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
  },
  button: {
    marginVertical: 20,
  },
  eventCard: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    overflow: "hidden",
    width: "100%",
  },
  eventCardImage: {
    width: "33%",
  },
  eventCardInfos: {
    width: "67%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: 10,
  },
  badgeView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

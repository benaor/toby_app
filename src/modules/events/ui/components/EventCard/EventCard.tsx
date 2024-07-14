import { toHumanDate } from "@/src/utils/dates/toHumanDate";
import { Chip } from "@components/Chip";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, Pressable, View } from "react-native";

type EventCardProps = {
  title: string;
  image: string;
  isAdmin?: boolean;
  nbOfNotification?: number;
  nbOfGuest: number;
  date: Date;
  onPress: () => void;
};

export const EventCard: FC<EventCardProps> = (props) => {
  return (
    <Pressable style={styles.eventCard} onPress={props.onPress}>
      <Image source={{ uri: props.image }} style={styles.eventCardImage} />
      <View style={styles.eventCardInfos}>
        <View style={styles.badgeView}>
          {props.isAdmin ? <Chip type="text" label="Admin" /> : <View />}
          {props.nbOfNotification ? (
            <Chip type="number" label={props.nbOfNotification} />
          ) : (
            <View />
          )}
        </View>
        <Typography.Header size="medium">{props.title}</Typography.Header>
        <Typography.Body>
          {props.nbOfGuest} pers. | {toHumanDate(props.date)}
        </Typography.Body>
      </View>
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
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

import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, View } from "react-native";
import { useEventSummaryScreen } from "./EventSummaryScreen.controller";

type EventSummaryScreenProps = {
  eventId: string;
};

export const EventSummaryScreen: FC<EventSummaryScreenProps> = ({
  eventId,
}) => {
  const { event } = useEventSummaryScreen();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://picsum.photos/200/300",
        }}
        style={styles.coverPicture}
      />
      <View style={styles.summaryView}></View>
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: theme.colors.background.low,
    gap: -20,
  },
  coverPicture: {
    height: "30%",
    width: "100%",
  },
  summaryView: {
    height: "70%",
  },
}));

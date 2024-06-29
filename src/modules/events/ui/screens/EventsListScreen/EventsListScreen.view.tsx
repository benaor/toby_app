import { IconButton } from "@components/IconButton";
import { SquareButton } from "@components/SquareButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { EventsList } from "../../components/EventsList/EventsList.view";

export const EventsListScreen: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.header}>
          <Typography.Body color="primary">Modifier</Typography.Body>
          <IconButton name="pluscircle" size={24} />
        </View>
        <Typography.Header size="large" color="primary">
          Vos événements
        </Typography.Header>
        <View style={styles.filters}>
          <SquareButton icon="search1" title="Recherche" onPress={() => {}} />
          <SquareButton icon="folder1" title="Archives" onPress={() => {}} />
        </View>
      </View>
      <EventsList />
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    height: "100%",
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  containerTop: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    gap: 26,
  },
}));

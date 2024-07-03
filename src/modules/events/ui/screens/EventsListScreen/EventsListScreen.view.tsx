import { IconButton } from "@components/IconButton";
import { SquareButton } from "@components/SquareButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable, View } from "react-native";
import { EventsList } from "../../components/EventsList";
import { useEventsListScreen } from "./EventsListScreen.controller";
import { EventsListSelection } from "../../components/EventsListSelection";

export const EventsListScreen: FC = () => {
  const { goToArchives, editMode, toggleEditMode } = useEventsListScreen();

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.header}>
          <Pressable onPress={toggleEditMode}>
            <Typography.Body color="primary">
              {editMode ? "Terminer" : "Modifier"}
            </Typography.Body>
          </Pressable>
          <IconButton name="pluscircle" size={24} />
        </View>
        <Typography.Header size="large" color="primary">
          Vos événements
        </Typography.Header>
        <View style={styles.filters}>
          <SquareButton icon="search1" title="Recherche" onPress={() => {}} />
          <SquareButton
            icon="folder1"
            title="Archives"
            onPress={goToArchives}
          />
        </View>
      </View>
      {editMode ? <EventsListSelection /> : <EventsList />}
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

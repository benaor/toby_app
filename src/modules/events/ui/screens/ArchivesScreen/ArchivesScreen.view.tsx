import { FC } from "react";
import { useArchivesScreen } from "./ArchivesScreen.controller";
import { View } from "react-native";
import { IconButton } from "@components/IconButton";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { ArchivesList } from "../../components/ArchivesList";

export const ArchivesScreen: FC = () => {
  const { goBack } = useArchivesScreen();

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.header}>
          <IconButton name="left" size={30} onPress={goBack} />
        </View>
        <Typography.Header size="large" color="primary">
          Archives
        </Typography.Header>
        <Typography.Body>
          Faites un saut dans le passé et redécouvrez vos évènements archivés.{" "}
        </Typography.Body>
        <ArchivesList />
      </View>
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
}));

import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FC, PropsWithChildren } from "react";
import { Platform, Pressable, View } from "react-native";

type ModalLayoutProps = PropsWithChildren & {
  title?: string;
};

export const ModalLayout: FC<ModalLayoutProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.header}>
        <Pressable>
          <Typography.Body>Retour</Typography.Body>
        </Pressable>
        <View style={styles.separator} />
        <Link href="../">
          <Typography.Body color="primary">Annuler</Typography.Body>
        </Link>
      </View>
      <View style={styles.content}>
        <Typography.Header style={styles.title} size="medium" color="primary">
          {title}
        </Typography.Header>
      </View>
      {children}
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    height: "100%",
    paddingHorizontal: 24,
  },
  header: {
    height: 48,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    height: 4,
    backgroundColor: theme.colors.border.medium,
    width: 130,
    borderRadius: 100,
  },
  content: {},
  title: {
    paddingVertical: 20,
    marginLeft: 10,
  },
}));

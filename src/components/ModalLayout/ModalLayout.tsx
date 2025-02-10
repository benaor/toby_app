import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { StatusBar } from "expo-status-bar";
import { FC, PropsWithChildren } from "react";
import { Platform, Pressable, View } from "react-native";
import { useRouter } from "@app/router/useRouter";
import { TEST_ID } from "@constants/testID";
type ModalLayoutProps = PropsWithChildren & {
  title?: string;
  onBack?: VoidFunction;
};

export const ModalLayout: FC<ModalLayoutProps> = ({
  title,
  children,
  onBack,
}) => {
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.header}>
        {onBack ? (
          <Pressable
            style={styles.navBtnLeft}
            onPress={onBack}
            testID={TEST_ID.MODAL_LAYOUT.BACK}
          >
            <Typography.Body>Retour</Typography.Body>
          </Pressable>
        ) : (
          <View style={styles.navBtnLeft} />
        )}

        <View style={styles.separator} />

        <Pressable
          style={styles.navBtnRight}
          onPress={back}
          testID={TEST_ID.MODAL_LAYOUT.CANCEL}
        >
          <Typography.Body color="primary">Annuler</Typography.Body>
        </Pressable>
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
  navBtnLeft: {
    width: 80,
    alignItems: "flex-start",
  },
  navBtnRight: {
    width: 80,
    alignItems: "flex-end",
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

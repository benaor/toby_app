import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable, View } from "react-native";

type ActivityItemProps = {
  schedule: string;
  title: string;
  info: string;
  onPress: VoidFunction;
};

export const ActivityItem: FC<ActivityItemProps> = ({
  schedule,
  title,
  info,
}) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.schedule}>
        <Typography.Header size="medium" lvlColor="low">
          {schedule}
        </Typography.Header>
      </View>

      <View style={styles.infos}>
        <Typography.Body textAlign="center" size="medium">
          {title}
        </Typography.Body>
        <Typography.Body textAlign="center" lvlColor="medium" size="small">
          {info}
        </Typography.Body>
      </View>
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    flex: 4,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    backgroundColor: theme.colors.background.low,
    borderRadius: 10,
    oveflow: "hidden",
  },
  schedule: {
    flex: 1,
    backgroundColor: theme.colors.primary.high,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
  },
  infos: {
    flex: 3,
    backgroundColor: theme.colors.background.low,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: "hidden",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
}));

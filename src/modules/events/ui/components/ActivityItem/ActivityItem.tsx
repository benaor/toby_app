import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable } from "react-native";

type ActivityItemProps = {
  hours: string;
  title: string;
  info: string;
  onPress: VoidFunction;
};

export const ActivityItem: FC<ActivityItemProps> = ({ hours, title, info }) => {
  return <Pressable style={styles.container}></Pressable>;
};

const styles = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    borderRadius: 10,
  },
}));

import { Icon } from "@components/Icon";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable, View } from "react-native";

type CalendarItemProps = {
  date: ISO8601;
  title: string;
  onPress: VoidFunction;
};

export const CalendarItem: FC<CalendarItemProps> = ({
  date,
  title,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.schedule}>
        <Typography.Header size="small" bold lvlColor="low">
          {new Date(date).toLocaleString("fr-FR", {
            month: "2-digit",
            day: "2-digit",
          })}
        </Typography.Header>
      </View>

      <View style={styles.title}>
        <Typography.Body textAlign="center" size="medium">
          {title}
        </Typography.Body>
      </View>

      <View style={styles.icon}>
        <Icon name="chevron-right" size={15} />
      </View>
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    flex: 5,
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
  title: {
    flex: 3,
    backgroundColor: theme.colors.background.low,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

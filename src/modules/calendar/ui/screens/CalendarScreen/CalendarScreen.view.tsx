import { FC } from "react";
import { useCalendarScreen } from "./CalendarScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { SectionList, View } from "react-native";
import { Typography } from "@components/Typography";
import { CalendarItem } from "@calendar/ui/components/CalendarItem";

export const CalendarScreen: FC = () => {
  const { sectionsOfEvents, goToEvent } = useCalendarScreen();

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionsOfEvents}
        renderSectionHeader={({ section }) => (
          <Typography.Header lvlColor="medium" style={styles.sectionHeader}>
            {section.title}
          </Typography.Header>
        )}
        renderItem={({ item }) => (
          <CalendarItem
            key={item.id}
            date={item.start}
            title={item.title}
            onPress={() => goToEvent(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    gap: 25,
    backgroundColor: theme.colors.background.low,
    minHeight: "100%",
  },
  sectionHeader: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
}));

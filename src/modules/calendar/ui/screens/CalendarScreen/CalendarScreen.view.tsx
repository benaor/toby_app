import { FC } from "react";
import { useCalendarScreen } from "./CalendarScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Header } from "@components/Header";
import { ScrollView, SectionList, View } from "react-native";
import { Typography } from "@components/Typography";
import { CalendarItem } from "@calendar/ui/components/CalendarItem";

export const CalendarScreen: FC = () => {
  const { sectionsOfEvents, goToEvent } = useCalendarScreen();

  return (
    <>
      <Header
        title="Calendrier"
        subtitle="Retrouvez tous vos évènements classé par ordre chronologique."
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
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
      </ScrollView>
    </>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: 35,
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

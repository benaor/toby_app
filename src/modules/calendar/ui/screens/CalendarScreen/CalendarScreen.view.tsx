import { FC } from "react";
import { useCalendarScreen } from "./CalendarScreen.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Header } from "@components/Header";
import { ScrollView, SectionList, View } from "react-native";
import { Typography } from "@components/Typography";

export const CalendarScreen: FC = () => {
  const { sectionsOfEvents } = useCalendarScreen();

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
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <Typography.Body>{section.title}</Typography.Body>
            )}
            renderItem={({ item, section }) => (
              <Typography.Body size="medium" color="primary">
                {item.title}
              </Typography.Body>
            )}
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
  },
}));

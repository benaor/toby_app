import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, ScrollView, View } from "react-native";
import { useEventSummaryScreen } from "./EventSummaryScreen.controller";
import { AcceptOrRefuseButton } from "@components/AcceptOrRefuseButton";
import { Typography } from "@components/Typography";
import { SquareButton } from "@components/SquareButton";

import MemberSVG from "@images/member.svg";
import MapSvg from "@images/map.svg";
import CalendarSVG from "@images/calendar.svg";
import BellSVG from "@images/bell.svg";
import EnvelopSVG from "@images/envelop.svg";
import NotesSVG from "@images/notes.svg";
import { useFeatureFlag } from "@/src/ui/contexts/useFeatureFlag";
import { SummarySubSection } from "../../components/SummarySubSection/SummarySubSection";

import LocationSVG from "@images/location.svg";
import { Button } from "@components/Button";
import { getDatesInRange } from "@utils/dates/getDateInRange";
import { ActivityItem } from "../../components/ActivityItem";

type EventSummaryScreenProps = {
  eventId: string;
};

export const EventSummaryScreen: FC<EventSummaryScreenProps> = ({
  eventId,
}) => {
  const { event, acceptInvitation, refuseInvitation } = useEventSummaryScreen();
  const { locationModule, activityModule } = useFeatureFlag();

  const dates: Date[] = getDatesInRange(event.dates.start, event.dates.end);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://picsum.photos/200/300",
        }}
        style={styles.coverPicture}
      />
      <View style={styles.summaryView}>
        <View style={styles.acceptOrRefuseSection}>
          <AcceptOrRefuseButton
            accept
            onAccept={acceptInvitation}
            active={event.invitationAccepted}
          />
          <AcceptOrRefuseButton
            refuse
            onRefuse={refuseInvitation}
            active={event.invitationAccepted}
          />
        </View>
        <View style={styles.infosContainer}>
          <SummarySubSection title="Résumé">
            <View style={styles.chipsContainer}>
              <View style={styles.chip}>
                <Typography.Body lvlColor="low" textAlign="center">
                  {event.dates.start.getFullYear()}
                </Typography.Body>
              </View>

              <View style={styles.chip}>
                <Typography.Body lvlColor="low" textAlign="center">
                  {event.guests.length ?? 0} pers.
                </Typography.Body>
              </View>

              <View style={styles.chip}>
                <Typography.Body lvlColor="low" textAlign="center">
                  {event.address.city}
                </Typography.Body>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.infoSquareBtnList}
            >
              <View style={styles.infoSquareBtn}>
                <SquareButton>
                  <MemberSVG />
                </SquareButton>
                <Typography.Body>Membres</Typography.Body>
              </View>

              <View style={styles.infoSquareBtn}>
                <SquareButton>
                  <CalendarSVG />
                </SquareButton>
                <Typography.Body>Dates</Typography.Body>
              </View>

              {locationModule && (
                <View style={styles.infoSquareBtn}>
                  <SquareButton>
                    <MapSvg />
                  </SquareButton>
                  <Typography.Body>Lieux</Typography.Body>
                </View>
              )}

              <View style={styles.infoSquareBtn}>
                <SquareButton>
                  <EnvelopSVG />
                </SquareButton>
                <Typography.Body>Importants</Typography.Body>
              </View>

              <View style={styles.infoSquareBtn}>
                <SquareButton>
                  <NotesSVG />
                </SquareButton>
                <Typography.Body>Notes</Typography.Body>
              </View>

              <View style={styles.infoSquareBtn}>
                <SquareButton>
                  <BellSVG />
                </SquareButton>
                <Typography.Body>Calendrier</Typography.Body>
              </View>
            </ScrollView>
          </SummarySubSection>

          <SummarySubSection title="Description">
            <Typography.Body>{event.description}</Typography.Body>
          </SummarySubSection>

          {locationModule && (
            <SummarySubSection title="Lieu">
              <LocationSVG />
            </SummarySubSection>
          )}

          {activityModule && (
            <SummarySubSection title="Activités" onEdit={() => null}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activityScrollView}
              >
                {dates.map((date, i) =>
                  i === 0 ? (
                    <Button
                      key={date.toISOString()}
                      variant="contained"
                      color="background"
                      lvlColor="high"
                    >
                      <Button.Label
                        label={date.toLocaleDateString()}
                        colors={["typography", "low"]}
                      />
                    </Button>
                  ) : (
                    <Button
                      key={date.toISOString()}
                      variant="contained"
                      color="background"
                      lvlColor="medium"
                    >
                      <Button.Label
                        label={date.toLocaleDateString()}
                        colors={["typography", "high"]}
                      />
                    </Button>
                  ),
                )}
              </ScrollView>
              <View style={styles.activityList}>
                <ActivityItem
                  hours="14h"
                  info="info"
                  title="title"
                  onPress={() => null}
                />
                <ActivityItem
                  hours="14h"
                  info="info"
                  title="title"
                  onPress={() => null}
                />
                <ActivityItem
                  hours="14h"
                  info="info"
                  title="title"
                  onPress={() => null}
                />
              </View>
            </SummarySubSection>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background.low,
    gap: -20,
    paddingBottom: 280,
  },
  coverPicture: {
    height: "32%",
    width: "100%",
  },
  summaryView: {
    paddingHorizontal: 24,
    borderRadius: 20,
    transform: [{ translateY: -20 }],
    backgroundColor: theme.colors.background.low,
  },
  acceptOrRefuseSection: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    transform: [{ translateY: -22 }],
  },

  infosContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    height: "auto",
  },
  chip: {
    height: "auto",
    display: "flex",
    flex: 3,
    backgroundColor: theme.colors.typography.high,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: theme.colors.typography.low,
  },
  infoSquareBtnList: {
    marginVertical: 20,
    gap: 12,
  },
  infoSquareBtn: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  activityScrollView: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
}));

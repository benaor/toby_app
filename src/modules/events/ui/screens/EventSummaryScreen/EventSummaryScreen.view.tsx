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

type EventSummaryScreenProps = {
  eventId: string;
};

export const EventSummaryScreen: FC<EventSummaryScreenProps> = ({
  eventId,
}) => {
  const { event, acceptInvitation, refuseInvitation } = useEventSummaryScreen();

  return (
    <View style={styles.container}>
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
          <Typography.Header style={styles.title} size="medium" color="primary">
            Résumé
          </Typography.Header>

          <View style={styles.chipsContainer}>
            <View style={styles.chip}>
              <Typography.Body lvlColor="low" textAlign="center">
                {event.date.getFullYear()}
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
            style={styles.infoSquareBtnList}
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

            <View style={styles.infoSquareBtn}>
              <SquareButton>
                <MapSvg />
              </SquareButton>
              <Typography.Body>Lieux</Typography.Body>
            </View>

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
        </View>
      </View>
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: theme.colors.background.low,
    gap: -20,
  },
  coverPicture: {
    height: "32%",
    width: "100%",
  },
  summaryView: {
    paddingHorizontal: 24,
    height: "70%",
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
  title: {
    paddingVertical: 10,
    marginLeft: 0,
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
  },
  infoSquareBtn: {
    paddingHorizontal: 6,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
}));

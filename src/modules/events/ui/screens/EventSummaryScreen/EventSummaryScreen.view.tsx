import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
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

import BirthdaySVG from "@images/birthday.svg";
import { Icon } from "@components/Icon";
import { Avatar } from "@components/Avatar";

type EventSummaryScreenProps = {
  eventId: string;
};

export const EventSummaryScreen: FC<EventSummaryScreenProps> = ({
  eventId,
}) => {
  const { event, survey, acceptInvitation, refuseInvitation } =
    useEventSummaryScreen();
  const {
    locationModule,
    activityModule,
    budgetModule,
    cagnotteModule,
    surveyModule,
  } = useFeatureFlag();

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
                  schedule="14h"
                  title="Five"
                  info="Rendez-vous à 13H30"
                  onPress={() => null}
                />
                <ActivityItem
                  schedule="14h"
                  title="Restaurant"
                  info="Réservation au nom de Pierre"
                  onPress={() => null}
                />
                <ActivityItem
                  schedule="14h"
                  title="soirée café OZ"
                  info="Entrée gratuite jusqu’à 23h"
                  onPress={() => null}
                />
                <Button style={styles.marginAuto} width={160}>
                  <Button.Label label="Ajouter une activité" />
                </Button>
              </View>
            </SummarySubSection>
          )}

          {budgetModule && (
            <SummarySubSection title="Budget" onEdit={() => {}}>
              <View style={styles.card}>
                <View style={styles.cardLeftPart}>
                  <BirthdaySVG />
                </View>
                <View style={styles.cardRightPart}>
                  <Typography.Header size="small" lvlColor="high">
                    {event.title}
                  </Typography.Header>
                  <Button variant="text" width={120}>
                    <Button.Icon name="clipboard" />
                    <Button.Label label="Copier le lien" />
                  </Button>
                  <Button width={120}>
                    <Button.Label label="Voir le budget" />
                  </Button>
                </View>
              </View>
            </SummarySubSection>
          )}

          {cagnotteModule && (
            <SummarySubSection title="Cagnotte" onEdit={() => {}}>
              <View style={styles.card}>
                <View style={styles.cardLeftPart}>
                  <Icon name="gift" size={40} />
                  <Typography.Body size="small" lvlColor="medium">
                    {event.pool.hasParticipated
                      ? "J'ai Participé !"
                      : "Je n'ai pas participé !"}
                  </Typography.Body>
                </View>
                <View style={styles.cardRightPart}>
                  <Typography.Header size="small" lvlColor="high">
                    {event.pool.title}
                  </Typography.Header>
                  <Button variant="text" width={120}>
                    <Button.Icon name="clipboard" />
                    <Button.Label label="Copier le lien" />
                  </Button>
                  <Button width={120}>
                    <Button.Label label="Voir la cagnotte" />
                  </Button>
                </View>
              </View>
            </SummarySubSection>
          )}

          {surveyModule && (
            <SummarySubSection title="Sondage" onEdit={() => {}}>
              <Typography.Body>
                {survey.isPending ? "En cours ..." : "Terminé !"}
              </Typography.Body>
              <Pressable style={styles.surveyPressable} onPress={() => {}}>
                <View style={styles.avatarsGrouped}>
                  {survey.guests.map((guest, index) => (
                    <Avatar
                      key={guest.id}
                      uri={guest.avatar}
                      style={index !== 0 ? { marginLeft: -15 } : undefined}
                    />
                  ))}
                </View>
                <Typography.Body lvlColor="high">
                  {survey.title}
                </Typography.Body>
                <Icon name="chevron-right" />
              </Pressable>
              <View style={styles.surveyButtons}>
                <Button width={160}>
                  <Button.Label label="Tous les sondages" />
                </Button>

                <Button width={160} color="background" lvlColor="medium">
                  <Button.Label
                    colors={["typography", "medium"]}
                    label="Créer un sondage"
                  />
                </Button>
              </View>
            </SummarySubSection>
          )}

          <SummarySubSection title="Album photos">
            <View style={styles.imageCard}>
              <View style={[styles.imgViewCol1, styles.paddingImg1]}>
                <Image
                  style={styles.img1}
                  source={{ uri: "https://picsum.photos/200/300" }}
                />
              </View>

              <View style={styles.imgViewCol2}>
                <View style={styles.paddingImg2}>
                  <Image
                    style={styles.img2}
                    source={{ uri: "https://picsum.photos/200/300" }}
                  />
                </View>

                <View style={styles.paddingImg3}>
                  <Image
                    style={styles.img3}
                    source={{ uri: "https://picsum.photos/200/300" }}
                  />
                </View>
              </View>
            </View>
          </SummarySubSection>

          <SummarySubSection title="Options" subTitle="administrateur">
            <Typography.Body style={styles.mt10} color="primary">
              Relance automatique :
            </Typography.Body>

            <Pressable style={styles.card} onPress={() => {}}>
              <Typography.Body>
                Relancer les invités n’ayant pas répondus
              </Typography.Body>
              <Icon name="chevron-right" />
            </Pressable>

            <Typography.Body style={styles.mt10} color="primary">
              Autres :
            </Typography.Body>

            <Button variant="text">
              <Button.Label label="Quitter l'évènement" />
            </Button>
            <Button variant="text">
              <Button.Label label="Archiver l'évènement" />
            </Button>
            <Button variant="text">
              <Button.Label
                colors={["primary", "high"]}
                label="Supprimer l'évènement"
              />
            </Button>
          </SummarySubSection>
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
    paddingBottom: 300,
  },
  coverPicture: {
    height: "32%",
    maxHeight: "32%",
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
    gap: 15,
  },
  marginAuto: {
    margin: "auto",
  },
  card: {
    flex: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    backgroundColor: theme.colors.background.low,
    borderRadius: 10,
  },
  cardLeftPart: {
    flex: 2,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardRightPart: {
    flex: 4,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  surveyPressable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    borderRadius: 10,
    backgroundColor: theme.colors.background.low,
    overflow: "hidden",
  },
  avatarsGrouped: {
    display: "flex",
    flexDirection: "row",
  },
  surveyButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 15,
  },
  imageCard: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imgViewCol1: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  imgViewCol2: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },
  paddingImg1: {
    paddingRight: 5,
  },
  paddingImg2: {
    paddingLeft: 5,
    paddingBottom: 5,
  },
  paddingImg3: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  img1: {
    height: 210,
    borderRadius: 5,
  },
  img2: {
    height: 100,
    borderRadius: 5,
  },
  img3: {
    height: 100,
    borderRadius: 5,
  },
  mt10: {
    marginTop: 20,
  },
}));

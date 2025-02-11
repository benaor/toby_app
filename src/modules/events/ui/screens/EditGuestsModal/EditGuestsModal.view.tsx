import { MemberInput } from "@components/MemberInput";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { useEditGuestsModal } from "./EditGuestsModal.controller";

type EditGuestsModalProps = {
  eventId: Identifier;
};

export const EditGuestsModal: FC<EditGuestsModalProps> = ({ eventId }) => {
  const {
    guestsWhoAreAccepted,
    guestsWhoAreRefused,
    guestsWhoAreNotDecided,
    removeGuest,
    isAdmin,
    isReady,
  } = useEditGuestsModal(eventId);

  if (!isReady) return <Typography.Body>Loading...</Typography.Body>; // TODO: add a loading state

  return (
    <ModalLayout title="Gérer les membres">
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput placeholder="Rechercher" variant="filled" />

        <Typography.Header size="medium" color="primary">
          {guestsWhoAreAccepted.length > 1 ? "Participants" : "Participant"}
        </Typography.Header>

        <View style={styles.guestsList}>
          {guestsWhoAreAccepted.map((guest) => (
            <MemberInput
              key={guest.id}
              image={guest.image}
              name={guest.name}
              onDelete={isAdmin ? () => removeGuest(guest.id) : undefined}
            />
          ))}
        </View>

        <Typography.Header size="medium" color="primary">
          {guestsWhoAreRefused.length > 1
            ? "Non-Participants"
            : "Non-Participant"}
        </Typography.Header>

        <View style={styles.guestsList}>
          {guestsWhoAreRefused.map((guest) => (
            <MemberInput
              key={guest.id}
              image={guest.image}
              name={guest.name}
              onDelete={isAdmin ? () => removeGuest(guest.id) : undefined}
            />
          ))}
        </View>

        {guestsWhoAreNotDecided.length > 0 && (
          <>
            <Typography.Header size="medium" color="primary">
              En attente de réponse
            </Typography.Header>

            <View style={styles.guestsList}>
              {guestsWhoAreNotDecided.map((guest) => (
                <MemberInput
                  key={guest.id}
                  image={guest.image}
                  name={guest.name}
                  onDelete={isAdmin ? () => removeGuest(guest.id) : undefined}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </ModalLayout>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    padding: 10,
    paddingBottom: 100,
  },
  guestsList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 15,
  },
  inviteGuestTitle: {
    gap: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#E4E4E4",
    overflow: "hidden",
  },

  buttonSection: {
    padding: 20,
  },
}));

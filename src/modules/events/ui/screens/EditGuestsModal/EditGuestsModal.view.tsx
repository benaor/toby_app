import { MemberInput } from "@components/MemberInput";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { ScrollView, View } from "react-native";
import { useEditGuestsModal } from "./EditGuestsModal.controller";

export const EditGuestsModal: FC = () => {
  const { guestsWhoAreAccepted, guestsWhoAreRefused, removeGuest } =
    useEditGuestsModal();

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
              onDelete={() => removeGuest(guest.id)}
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
              onDelete={() => removeGuest(guest.id)}
            />
          ))}
        </View>
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

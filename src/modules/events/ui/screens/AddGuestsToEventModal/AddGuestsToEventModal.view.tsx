import { FC } from "react";
import { useAddGuestsToEventModal } from "./AddGuestsToEventModal.controller";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { View } from "react-native";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";
import { MemberInput } from "@components/MemberInput";

export const AddGuestsToEventModal: FC = () => {
  const { guests, guestsProposition, removeGuest, addGuest } =
    useAddGuestsToEventModal();

  return (
    <ModalLayout title="Créer un évènement">
      <View style={styles.container}>
        <Typography.Header size="medium" lvlColor="medium">
          Ajouter des membres
        </Typography.Header>

        <TextInput placeholder="Rechercher" variant="filled" />
        <View style={styles.guestsList}>
          {guests.map((guest) => (
            <MemberInput
              key={guest.id}
              image={guest.image}
              name={guest.name}
              onDelete={() => removeGuest(guest.id)}
            />
          ))}
        </View>

        <View style={styles.inviteGuestTitle}>
          <Typography.Body lvlColor="high">Inviter sur Toby</Typography.Body>
        </View>

        <View style={styles.guestsList}>
          {guestsProposition.map((guest) => (
            <MemberInput
              key={guest.id}
              image={guest.image}
              name={guest.name}
              onAddGuest={() => addGuest(guest.id)}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Button color="primary" lvlColor="high">
          <Button.Label label="Suivant" />
        </Button>
      </View>
    </ModalLayout>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    padding: 10,
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

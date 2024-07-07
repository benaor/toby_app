import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { useEventInformationsModal } from "./EventInformationsModal.controller";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

export const EventInformationsModal: FC = () => {
  const presenter = useEventInformationsModal();

  return (
    <ModalLayout title="Créer un évènement">
      <View style={styles.container}>
        <TextInput label="Nom de l'évènement" variant="filled" />
        <TextInput
          label="Description de l'évènement"
          variant="filled"
          textarea
        />
      </View>
    </ModalLayout>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
}));

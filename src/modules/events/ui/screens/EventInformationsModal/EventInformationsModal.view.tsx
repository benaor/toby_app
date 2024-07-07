import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { useEventInformationsModal } from "./EventInformationsModal.controller";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";
import { Button } from "@components/Button";
import { Typography } from "@components/Typography";

export const EventInformationsModal: FC = () => {
  const { submitGeneralInformations } = useEventInformationsModal();

  return (
    <ModalLayout title="Créer un évènement">
      <View style={styles.container}>
        <TextInput label="Nom de l'évènement" variant="filled" />
        <TextInput
          label="Description de l'évènement"
          variant="filled"
          textarea
        />
        <View style={styles.pictureBtn}>
          <Typography.Body>Photo de couverture</Typography.Body>
          <Button color="background" lvlColor="medium">
            <Button.Label
              colors={["typography", "high"]}
              label="Ajouter une image"
            />
          </Button>
        </View>

        <Button
          color="primary"
          lvlColor="high"
          onPress={submitGeneralInformations}
          style={styles.btnNext}
        >
          <Button.Label label="Suivant" />
        </Button>
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
  pictureBtn: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  btnNext: {
    marginTop: 50,
  },
}));

import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { useEventAdditionalInfosModal } from "./EventAdditionalInfosModal.controller";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { TextInput } from "@components/TextInput";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";

export const EventAdditionalInfosModal: FC = () => {
  const { toggleHasEndDate, hasEndDate } = useEventAdditionalInfosModal();

  return (
    <ModalLayout title="Informations complémentaires">
      <View style={styles.container}>
        <View style={styles.placeSection}>
          <Typography.Header size="medium" lvlColor="medium">
            Ajouter un lieu
          </Typography.Header>
          <TextInput label="Nom" variant="filled" />
          <TextInput label="Adresse" variant="filled" />
        </View>

        <View style={styles.dateSection}>
          <Typography.Header size="medium" lvlColor="medium">
            Ajouter une date
          </Typography.Header>
          <TextInput label="Date de début" variant="filled" />
          <Switch
            label="Cet évènement a une date de fin"
            onChange={toggleHasEndDate}
            value={hasEndDate}
          />
          {hasEndDate && <TextInput label="Date de fin" variant="filled" />}
        </View>

        <View style={styles.buttonSection}>
          <Button color="primary" lvlColor="high">
            <Button.Label label="Suivant" />
          </Button>

          <Button variant="text">
            <Button.Label label="Plus tard" />
          </Button>
        </View>
      </View>
    </ModalLayout>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    padding: 10,
  },
  placeSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  dateSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  buttonSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
}));

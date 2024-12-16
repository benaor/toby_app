import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { useEventAdditionalInfosModal } from "./EventAdditionalInfosModal.controller";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Typography } from "@components/Typography";
import { TextInput } from "@components/TextInput";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";
import { DateTimeInput } from "@components/DateTimeInput";

export const EventAdditionalInfosModal: FC = () => {
  const {
    toggleHasEndDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hasEndDate,
    setAddress,
    setName,
    errorMessage,
    closeModal,
    setAdditionalsInfos,
  } = useEventAdditionalInfosModal();

  return (
    <ModalLayout title="Informations complémentaires">
      <View style={styles.container}>
        <View style={styles.placeSection}>
          <Typography.Header size="medium" lvlColor="medium">
            Ajouter un lieu
          </Typography.Header>
          <TextInput
            label="Nom"
            variant="filled"
            onChangeText={setName}
            error={errorMessage.location.name}
          />
          <TextInput
            label="Adresse"
            variant="filled"
            onChangeText={setAddress}
            error={errorMessage.location.address}
          />
        </View>

        <View style={styles.dateSection}>
          <Typography.Header size="medium" lvlColor="medium">
            Ajouter une date
          </Typography.Header>
          <DateTimeInput
            label="Date de début"
            value={startDate}
            onChange={setStartDate}
            error={errorMessage.date.start}
          />
          <Switch
            label="Cet évènement a une date de fin"
            onChange={toggleHasEndDate}
            value={hasEndDate}
          />
          {hasEndDate && (
            <DateTimeInput
              label="Date de fin"
              value={endDate}
              onChange={setEndDate}
              error={errorMessage.date.end}
            />
          )}
        </View>

        <View style={styles.buttonSection}>
          <Button color="primary" lvlColor="high" onPress={setAdditionalsInfos}>
            <Button.Label label="Suivant" />
          </Button>

          <Button variant="text" onPress={closeModal}>
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

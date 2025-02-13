import { ModalLayout } from "@components/ModalLayout";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { useEditDateModal } from "./EditDateModal.controller";
import { Button } from "@components/Button";
import { DateTimeInput } from "@components/DateTimeInput";
import { Switch } from "@components/Switch";

type EditDateModalProps = {
  eventId: Identifier;
};

export const EditDateModal: FC<EditDateModalProps> = ({ eventId }) => {
  const {
    changeEventDate,
    isReady,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hasEndDate,
    toggleHasEndDate,
    endDateError,
  } = useEditDateModal(eventId);

  if (!isReady) return <Typography.Body>Loading...</Typography.Body>; // TODO: add a loading state

  return (
    <ModalLayout title="Modifier la date">
      <View style={styles.container}>
        <Typography.Body size="small">
          En modifiant la date de l’évènement, tous les participants recevront
          une notification.
        </Typography.Body>

        <DateTimeInput
          label="Date de début"
          value={startDate ?? undefined}
          onChange={(date) => setStartDate(date ?? null)}
        />

        <Switch
          label="Cet évènement a une date de fin"
          onChange={toggleHasEndDate}
          value={hasEndDate}
        />

        {hasEndDate && (
          <DateTimeInput
            label="Date de fin (facultatif)"
            value={endDate ?? undefined}
            onChange={(date) => setEndDate(date ?? null)}
            error={endDateError}
          />
        )}

        <Button
          style={styles.btn}
          width={180}
          onPress={changeEventDate}
          disabled={!!endDateError || !startDate}
        >
          <Button.Label label="Valider" />
        </Button>
      </View>
    </ModalLayout>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 20,
  },
  btn: {
    marginHorizontal: "auto",
    marginTop: 20,
  },
}));

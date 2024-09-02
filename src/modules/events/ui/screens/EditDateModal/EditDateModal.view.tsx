import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";
import { useEditDateModal } from "./EditDateModal.controller";
import { Button } from "@components/Button";

export const EditDateModal: FC = () => {
  const { changeEventDate } = useEditDateModal();
  return (
    <ModalLayout title="Modifier la date">
      <View style={styles.container}>
        <Typography.Body size="small">
          En modifiant la date de l’évènement, tous les participants recevront
          une notification.
        </Typography.Body>
        <TextInput label="Date de début" variant="filled" />
        <TextInput label="Date de fin (facultatif)" variant="filled" />
        <Button style={styles.btn} width={180} onPress={changeEventDate}>
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

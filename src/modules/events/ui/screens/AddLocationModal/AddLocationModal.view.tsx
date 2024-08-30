import { Button } from "@components/Button";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";
import { useAddLocationModal } from "./AddLocationModal.controller";

export const AddLocationModal = () => {
  const { saveLocation } = useAddLocationModal();
  return (
    <ModalLayout title="Ajouter un lieu">
      <View style={styles.container}>
        <TextInput label="Nom du lieu" variant="filled" />
        <TextInput label="Adresse" variant="filled" />
        <TextInput label="Ville" variant="filled" />
        <Button style={styles.btn} width={180} onPress={saveLocation}>
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

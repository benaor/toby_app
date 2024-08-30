import { ModalLayout } from "@components/ModalLayout";
import { useEditLocationModal } from "./EditLocationsModal.controller";
import { Typography } from "@components/Typography";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { DraggableItem } from "@components/DraggableItem";
import { Button } from "@components/Button";

export const EditLocationsModal: React.FC = () => {
  const { locations, deleteLocation, addLocation } = useEditLocationModal();

  return (
    <ModalLayout title="Modifier les lieux">
      <View style={styles.container}>
        <Typography.Body size="small">
          En modifiant le lieu de l’évènement, tous les participants recevront
          une notification.
        </Typography.Body>
        {locations.map((location) => (
          <DraggableItem
            key={location.id}
            label={location.name}
            onDelete={() => deleteLocation(location.id)}
          />
        ))}
        <Button style={styles.btn} width={180} onPress={addLocation}>
          <Button.Label label="Ajouter un lieu" />
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

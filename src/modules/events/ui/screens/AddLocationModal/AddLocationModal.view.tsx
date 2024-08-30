import { ModalLayout } from "@components/ModalLayout";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

export const AddLocationModal = () => {
  return (
    <ModalLayout title="Ajouter un lieu">
      <View style={styles.container}></View>
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
}));

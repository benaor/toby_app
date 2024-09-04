import { Button } from "@components/Button";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";

export const AddBudgetModal: FC = () => {
  return (
    <ModalLayout title="Ajouter un budget">
      <View style={styles.container}>
        <TextInput
          label="Copier/coller le lien vers le tricount"
          variant="filled"
        />
        <Button style={styles.btn} width={180}>
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
    gap: 15,
    padding: 20,
  },
  btn: {
    marginHorizontal: "auto",
    marginTop: 20,
  },
}));

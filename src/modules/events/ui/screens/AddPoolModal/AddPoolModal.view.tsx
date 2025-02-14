import { Button } from "@components/Button";
import { ModalLayout } from "@components/ModalLayout";
import { TextInput } from "@components/TextInput";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useFeatureFlag } from "@/src/ui/contexts/useFeatureFlag";
import { FC } from "react";
import { View } from "react-native";
import { useAddPoolModal } from "./AddPoolModal.controller";
import { Chip } from "@components/Chip";

export const AddPoolModal: FC = () => {
  const { createPool } = useAddPoolModal();
  const { modules } = useFeatureFlag();

  return modules.cagnotte ? (
    <ModalLayout title="Créer une cagnotte">
      <View style={styles.container}>
        <TextInput
          label="Copier/coller le lien de votre cagnotte :"
          variant="filled"
        />

        <Typography.Body size="small">
          Vous pouvez créer une cagnotte chez l'un de nos partenaire :
        </Typography.Body>

        <View style={styles.chipContainer}>
          <Chip type="text" label="Leetchi" color="border" />
          <Chip type="text" label="Le Pot Commun" color="border" />
        </View>

        <Button style={styles.btn} width={180} onPress={createPool}>
          <Button.Label label="Valider" />
        </Button>
      </View>
    </ModalLayout>
  ) : null;
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    padding: 10,
  },
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  btn: {
    marginHorizontal: "auto",
    marginTop: 20,
  },
}));

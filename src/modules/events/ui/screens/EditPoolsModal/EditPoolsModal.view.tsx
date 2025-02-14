import { ModalLayout } from "@components/ModalLayout";

import { Typography } from "@components/Typography";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { DraggableItem } from "@components/DraggableItem";
import { Button } from "@components/Button";
import { useEditPoolsModal } from "./EditPoolsModal.controller";
import { useFeatureFlag } from "@/src/ui/contexts/useFeatureFlag";

export const EditPoolsModal: React.FC = () => {
  const { pools, deletePool, addPool } = useEditPoolsModal();
  const { modules } = useFeatureFlag();

  return modules.cagnotte ? (
    <ModalLayout title="Modifier la cagnotte">
      <View style={styles.container}>
        <Typography.Body size="small">
          Gérer toutes les cagnottes.
        </Typography.Body>
        {pools.map((pool) => (
          <DraggableItem
            key={pool.id}
            label={pool.name}
            onDelete={() => deletePool(pool.id)}
          />
        ))}

        <Button style={styles.btn} width={180} onPress={addPool}>
          <Button.Label label="Ajouter une cagnotte" />
        </Button>
      </View>
    </ModalLayout>
  ) : null;
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

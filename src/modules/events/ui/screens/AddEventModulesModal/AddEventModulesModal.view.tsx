import { FC } from "react";
import { useAddEventModulesModal } from "./AddEventModulesModal.controller";
import { ModalLayout } from "@components/ModalLayout";
import { View } from "react-native";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Switch } from "@components/Switch";
import { Button } from "@components/Button";

export const AddEventModulesModal: FC = () => {
  const presenter = useAddEventModulesModal();

  return (
    <ModalLayout title="Ajouter des modules">
      <View style={styles.container}>
        <Typography.Header size="medium" lvlColor="medium">
          Ajouter des modules
        </Typography.Header>

        <View style={styles.switchContainer}>
          <View style={styles.switchModuleOn}>
            <Typography.Body size="medium" lvlColor="high" bold>
              Activer le module lieu
            </Typography.Body>
            <Switch label="Le module lieu vous permet de mettre en avant le lieu sélectionné pour votre évènement." />
          </View>

          <View style={styles.switchModuleOn}>
            <Typography.Body size="medium" lvlColor="high" bold>
              Activer le module cagnotte
            </Typography.Body>
            <Switch label="Le module cagnotte vous permet de mettre en avant le lien vers la cagnotte de l’évènement." />
          </View>

          <View style={styles.switchModuleOn}>
            <Typography.Body size="medium" lvlColor="high" bold>
              Activer le module budget
            </Typography.Body>
            <Switch label="Le module activités vous permet de lister les activité prévu pour l’évènement." />
          </View>

          <View style={styles.switchModuleOn}>
            <Typography.Body size="medium" lvlColor="high" bold>
              Activer le module activités
            </Typography.Body>
            <Switch label="Le module lieu vous permet de mettre en avant le lieu sélectionné pour votre évènement. " />
          </View>
        </View>

        <Button style={styles.button}>
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
    width: "100%",
  },
  switchModuleOn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 5,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingVertical: 20,
  },
  button: {
    marginTop: 60,
  },
}));

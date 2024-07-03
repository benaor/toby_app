import { Button } from "@components/Button";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";

export const NoEventText: FC = () => (
  <>
    <Typography.Header size="medium" color="primary" textAlign="center">
      Vous n'avez aucun evenement en cours.
    </Typography.Header>
    <Typography.Body textAlign="center">
      Créez dès maintenant votre premier évènement !
    </Typography.Body>
    <Button style={styles.button}>
      <Button.Label label="Créer un évènement" />
    </Button>
  </>
);

const styles = createStyleSheet(() => ({
  button: {
    marginVertical: 20,
  },
}));

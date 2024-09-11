import { Typography } from "@components/Typography";
import { ProfilButton } from "@profil/ui/components/ProfilButton";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useProfilScreen } from "./ProfilScreen.controller";
import { Button } from "@components/Button";

export const ProfilScreen: FC = () => {
  const _ = useProfilScreen();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography.Header lvlColor="medium">Réglages</Typography.Header>
      <ProfilButton label="Mon compte" withIcon />
      <ProfilButton label="Notifications" withIcon />
      <ProfilButton label="Abonnement" />

      <Typography.Header lvlColor="medium">Autres</Typography.Header>
      <ProfilButton label="Aide" withIcon />
      <ProfilButton label="Feedback" withIcon />
      <ProfilButton label="Noter l'application" withIcon />
      <ProfilButton label="Partager" withIcon />

      <Typography.Header lvlColor="medium">
        Données personnelles
      </Typography.Header>
      <ProfilButton label="Politique de confidentialités" withIcon />

      <View style={{ height: 20 }} />

      <Button color="background" lvlColor="low">
        <Button.Label label="Déconnexion" colors={["typography", "high"]} />
      </Button>

      <Pressable>
        <Typography.Body color="primary" lvlColor="high" textAlign="center">
          Supprimer le compte
        </Typography.Body>
      </Pressable>
    </ScrollView>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    padding: 20,
    gap: 15,
  },
}));

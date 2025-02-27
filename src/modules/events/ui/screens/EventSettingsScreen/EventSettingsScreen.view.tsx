import React, { FC } from "react";
import { useEventSettingsScreen } from "./EventSettingsScreen.controller";
import { ScrollView, View } from "react-native";
import { Header } from "@components/Header";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Switch } from "@components/Switch";
import { Icon } from "@components/Icon";
import { MemberInput } from "@components/MemberInput";
import { Button } from "@components/Button";
import { useFeatureFlag } from "@/src/ui/contexts/useFeatureFlag";

export const EventSettingsScreen: FC = () => {
  const { admins } = useEventSettingsScreen();
  const { modules, features } = useFeatureFlag();

  return (
    <>
      <Header title="Paramètres" canGoBack />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Typography.Header color="primary">
            Titre et description
          </Typography.Header>
          <Typography.Body>
            Modifier le titre et la description de l'événement
          </Typography.Body>
        </View>

        <View style={styles.switchModuleOn}>
          <Typography.Body size="medium" lvlColor="high" bold>
            Modifier le titre et l'image
          </Typography.Body>

          <View style={styles.labelContainer}>
            <Typography.Body size="small" style={styles.label}>
              Changer le titre et l'image de couverture de votre évènement.
            </Typography.Body>
            <Icon name="chevron-right" size={20} />
          </View>
        </View>

        <View style={styles.switchModuleOn}>
          <Typography.Body size="medium" lvlColor="high" bold>
            Modifier la description
          </Typography.Body>

          <View style={styles.labelContainer}>
            <Typography.Body size="small" style={styles.label}>
              Changer la description de votre évènement.
            </Typography.Body>
            <Icon name="chevron-right" size={20} />
          </View>
        </View>

        {(modules.location || modules.cagnotte || modules.budget) && (
          <>
            <View>
              <Typography.Header color="primary">
                Les modules de l'évènement
              </Typography.Header>
              <Typography.Body>
                Les différents modules actif sur cet évènement
              </Typography.Body>
            </View>

            {modules.location && (
              <View style={styles.switchModuleOn}>
                <Typography.Body size="medium" lvlColor="high" bold>
                  Activer le module lieu
                </Typography.Body>
                <Switch label="Le module lieu vous permet de mettre en avant le lieu sélectionné pour votre évènement." />
              </View>
            )}

            {modules.cagnotte && (
              <View style={styles.switchModuleOn}>
                <Typography.Body size="medium" lvlColor="high" bold>
                  Activer le module cagnotte
                </Typography.Body>
                <Switch label="Le module cagnotte vous permet de mettre en avant le lien vers la cagnotte de l’évènement." />
              </View>
            )}

            {modules.budget && (
              <View style={styles.switchModuleOn}>
                <Typography.Body size="medium" lvlColor="high" bold>
                  Activer le module budget
                </Typography.Body>
                <Switch label="Le module activités vous permet de lister les activité prévu pour l’évènement." />
              </View>
            )}
          </>
        )}

        <View>
          <Typography.Header color="primary">
            Gestion des participants
          </Typography.Header>
          <Typography.Body>
            Indiquez qui peut ajouter/supprimer des particpants.
          </Typography.Body>
        </View>

        <View style={styles.switchModuleOn}>
          <Typography.Body size="medium" lvlColor="high" bold>
            Uniquement les administrateurs
          </Typography.Body>
          <Switch label="Seul les administrateurs de l’évènement peuvent ajouter ou supprimer des participants." />
        </View>

        <View style={styles.switchModuleOn}>
          <Typography.Body size="medium" lvlColor="high" bold>
            Tous les participants
          </Typography.Body>
          <Switch label="Tous les participants de l’évènement peuvent ajouter ou supprimer des participants." />
        </View>

        <View>
          <Typography.Header color="primary">Administrateurs</Typography.Header>
          <Typography.Body>
            Un administrateur peut accèder aux paramètres de l’évènement.
          </Typography.Body>
        </View>

        {admins.map((admin) => (
          <MemberInput
            key={admin.id}
            image={admin.avatar}
            onDelete={() => null}
            name={admin.name}
          />
        ))}

        {features.newsAdmin && (
          <Button variant="text">
            <Button.Label
              colors={["primary", "high"]}
              label="Ajouter un administrateur"
            />
          </Button>
        )}
      </ScrollView>
    </>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: 35,
    paddingBottom: 50,
    gap: 25,
    backgroundColor: theme.colors.background.low,
  },
  switchModuleOn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 5,
  },
  label: {
    maxWidth: "80%",
  },
  labelContainer: {
    minHeight: 46,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

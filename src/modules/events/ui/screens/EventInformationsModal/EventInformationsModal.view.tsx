import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { useEventInformationsModal } from "./EventInformationsModal.controller";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { Image, ScrollView, View } from "react-native";
import { Button } from "@components/Button";
import { Typography } from "@components/Typography";
import * as ImagePicker from "expo-image-picker";

export const EventInformationsModal: FC = () => {
  const {
    submitGeneralInformations,
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    errorMessage,
  } = useEventInformationsModal();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ModalLayout title="Créer un évènement">
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            label="Nom de l'évènement"
            variant="filled"
            value={title}
            onChangeText={setTitle}
          />
          <Typography.Body color="primary">
            {errorMessage.title}
          </Typography.Body>
        </View>

        <View>
          <TextInput
            label="Description de l'évènement"
            variant="filled"
            textarea
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <Typography.Body color="primary">
            {errorMessage.description}
          </Typography.Body>
        </View>

        <View style={styles.pictureBtn}>
          <Typography.Body>Photo de couverture</Typography.Body>
          <View>
            <Button color="background" lvlColor="medium" onPress={pickImage}>
              <Button.Label
                colors={["typography", "high"]}
                label="Ajouter une image"
              />
            </Button>
            <Typography.Body color="primary">
              {errorMessage.image}
            </Typography.Body>
          </View>
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        <Button
          color="primary"
          lvlColor="high"
          onPress={submitGeneralInformations}
          style={styles.btnNext}
        >
          <Button.Label label="Suivant" />
        </Button>
      </ScrollView>
    </ModalLayout>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 10,
    paddingBottom: 50,
  },
  pictureBtn: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  btnNext: {
    marginTop: 30,
  },
  image: {
    width: "100%",
    minHeight: 200,
    borderRadius: 10,
    borderColor: theme.colors.border.medium,
    borderWidth: 1,
  },
}));

import { IconButton } from "@components/IconButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, Pressable } from "react-native";
import { View } from "react-native";

type MemberInputProps =
  | {
      image: string;
      name: string;
      onDelete: () => void;
      onAddGuest?: never;
    }
  | {
      image: string;
      name: string;
      onAddGuest: () => void;
      onDelete?: never;
    };

export const MemberInput: FC<MemberInputProps> = ({
  image,
  name,
  onDelete,
  onAddGuest,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.guestImage} />
      <Typography.Body lvlColor="high">{name}</Typography.Body>
      {onDelete && (
        <IconButton name="closecircle" size={15} onPress={onDelete} />
      )}
      {onAddGuest && (
        <Pressable onPress={onAddGuest}>
          <Typography.Body lvlColor="high">Ajouter</Typography.Body>
        </Pressable>
      )}
    </View>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  guestImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
}));

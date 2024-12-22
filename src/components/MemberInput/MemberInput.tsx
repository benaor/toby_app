import { Avatar } from "@components/Avatar";
import { IconButton } from "@components/IconButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable } from "react-native";
import { View } from "react-native";

type MemberInputProps =
  | {
      image: string;
      name: string;
      onDelete: VoidFunction;
      onAddGuest?: never;
    }
  | {
      image: string;
      name: string;
      onAddGuest: VoidFunction;
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
      <Avatar uri={image} />
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
}));

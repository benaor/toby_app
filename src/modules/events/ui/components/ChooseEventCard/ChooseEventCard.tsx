import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { OnPressFunction, Pressable, View } from "react-native";

type ChooseEventCardProps = {
  title: string;
  description: string;
  ImageSVG: FC;
  selected?: boolean;
  onPress?: OnPressFunction;
};

export const ChooseEventCard: FC<ChooseEventCardProps> = ({
  title,
  description,
  ImageSVG,
  selected,
  onPress,
}) => {
  const dynamics = createStyleSheet((theme) => ({
    container: {
      borderColor: selected
        ? theme.colors.primary.medium
        : theme.colors.border.low,
    },
  }));

  return (
    <Pressable style={[styles.container, dynamics.container]} onPress={onPress}>
      <View style={styles.titleContainer}>
        <ImageSVG />
        <Typography.Body color="primary">{title}</Typography.Body>
      </View>
      <Typography.Body>{description}</Typography.Body>
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    width: 155,
    height: 110,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    padding: 12,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
}));

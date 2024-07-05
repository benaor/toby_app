import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";

type ChooseEventCardProps = {
  title: string;
  description: string;
  ImageSVG: FC;
};

export const ChooseEventCard: FC<ChooseEventCardProps> = ({
  title,
  description,
  ImageSVG,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ImageSVG />
        <Typography.Body color="primary">{title}</Typography.Body>
      </View>
      <Typography.Body>{description}</Typography.Body>
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    width: 155,
    height: 110,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.border.low,
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

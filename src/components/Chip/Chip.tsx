import { FC } from "react";
import { View } from "react-native";
import { Typography } from "..";
import { createStyleSheet } from "@themes/createStyleSheet";

type ChipProps =
  | {
      type: "number";
      label: number;
    }
  | {
      type: "text";
      label: string;
    };

export const Chip: FC<ChipProps> = ({ type, label }) => {
  const chipStyles = createStyleSheet((theme) => ({
    chip: {
      borderRadius: type === "text" ? 10 : 100,
      width: type === "text" ? "auto" : 25,
      paddingHorizontal: type === "text" ? 10 : 0,
    },
  }));

  return (
    <View style={[styles.chip, chipStyles.chip]}>
      <Typography.Body
        size="small"
        color="typography"
        lvlColor="low"
        textAlign="center"
      >
        {label}
      </Typography.Body>
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  chip: {
    backgroundColor: theme.colors.primary.high,
    color: theme.colors.typography.low,
    display: "flex",
    justifyContent: "center",
    height: 25,
  },
}));

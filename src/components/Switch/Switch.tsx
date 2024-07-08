import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import {
  View,
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
} from "react-native";

type SwitchProps = RNSwitchProps & {
  label?: string;
};

export const Switch: FC<SwitchProps> = ({ label, ...switchProps }) => {
  if (label)
    return (
      <View style={styles.container}>
        <Typography.Body>{label}</Typography.Body>
        <RNSwitch {...switchProps} />
      </View>
    );

  return <RNSwitch {...switchProps} />;
};

const styles = createStyleSheet(() => ({
  container: {
    minHeight: 46,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

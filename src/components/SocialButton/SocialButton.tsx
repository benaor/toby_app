import { createStyleSheet } from "@/src/themes/createStyleSheet";
import { ColorValue, PressableProps, View } from "react-native";

import { FC, useMemo } from "react";

import { firstCharToUppercase } from "@/src/utils/strings/firstCharToUppercase";
import { Button } from "../Button";
import { ColorAndLevelTuple } from "@/src/themes/theme";
import { IconListFromAntDesign } from "../../utils/icons/IconListFromExpo";
import { useTheme } from "@/src/themes/useTheme";

type SocialButtonProps = Pick<PressableProps, "onPress"> & {
  network: "apple" | "google";
};

export const SocialButton: FC<SocialButtonProps> = ({ network, ...props }) => {
  const { colors } = useTheme();

  const [btnColor, btnLvlColor]: ColorAndLevelTuple = useMemo(() => {
    switch (network) {
      case "apple":
        return ["background", "high"];
      case "google":
        return ["background", "low"];
    }
  }, [network]);

  const [labelColor, labelLvlColor]: ColorAndLevelTuple = useMemo(() => {
    switch (network) {
      case "apple":
        return ["typography", "low"];
      case "google":
        return ["typography", "high"];
    }
  }, [network]);

  const iconName: IconListFromAntDesign = useMemo(() => {
    switch (network) {
      case "apple":
        return "apple1";
      case "google":
        return "google";
    }
  }, [network]);

  const iconColor: ColorValue = useMemo(() => {
    switch (network) {
      case "apple":
        return colors.typography.low;
      case "google":
        return colors.typography.high;
    }
  }, [network, colors]);

  return (
    <Button
      fullWidth
      variant="contained"
      color={btnColor}
      lvlColor={btnLvlColor}
      style={styles.button}
      {...props}
    >
      <Button.Icon name={iconName} color={iconColor} />
      <View style={{ width: 5 }} />
      <Button.Label
        colors={[labelColor, labelLvlColor]}
        label={`Se connecter avec ${firstCharToUppercase(network)}`}
      />
    </Button>
  );
};

const styles = createStyleSheet((theme) => ({
  button: {
    borderColor: theme.colors.border.medium,
    borderWidth: 1,
  },
}));

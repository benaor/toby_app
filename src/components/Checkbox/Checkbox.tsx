import React, { FC, useState } from "react";
import { Pressable } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import Entypo from "@expo/vector-icons/Entypo";

type CheckBoxProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export const CheckBox: FC<CheckBoxProps> = ({
  checked = false,
  onChange,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { colors } = useTheme();

  const toggleCheck = () => {
    if (!!onChange) onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  const style = createStyleSheet((theme) => ({
    container: {
      backgroundColor: isChecked
        ? theme.colors.primary.high
        : theme.colors.background.low,
    },
  }));

  return (
    <Pressable
      onPress={toggleCheck}
      style={[styles.container, style.container]}
    >
      {isChecked && (
        <Entypo name="check" size={17} color={colors.typography.low} />
      )}
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    borderColor: theme.colors.border.high,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 100,
    gap: 8,
    width: 26,
    height: 26,
  },
}));

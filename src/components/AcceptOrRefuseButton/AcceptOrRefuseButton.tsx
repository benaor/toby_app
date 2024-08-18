import { Icon } from "@components/Icon";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";
import { Pressable } from "react-native";

export type AcceptOrRefuseButtonProps =
  | {
      active: boolean;
      accept: boolean;
      onAccept: () => void;
      refuse?: never;
      onRefuse?: never;
    }
  | {
      active: boolean;
      refuse: boolean;
      onRefuse: () => void;
      accept?: never;
      onAccept?: never;
    };

export const AcceptOrRefuseButton: FC<AcceptOrRefuseButtonProps> = ({
  active,
  accept,
  onAccept,
  refuse,
  onRefuse,
}) => {
  const theme = useTheme();

  const AcceptButton = () => {
    return (
      <Pressable
        style={styles.container}
        onPress={accept ? onAccept : onRefuse}
      >
        <Icon
          name="checkcircle"
          size={27}
          color={
            active
              ? theme.colors.secondary.high
              : theme.colors.background.medium
          }
        />
      </Pressable>
    );
  };

  const RefuseButton = () => {
    return (
      <Pressable style={styles.container} onPress={onRefuse}>
        <Icon
          name="closecircle"
          size={27}
          color={
            active
              ? theme.colors.primary.medium
              : theme.colors.background.medium
          }
        />
      </Pressable>
    );
  };

  return (
    <>
      {accept && <AcceptButton />}
      {refuse && <RefuseButton />}
    </>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: theme.colors.background.low,
    borderColor: theme.colors.border.low,
    borderWidth: 1,
  },
}));

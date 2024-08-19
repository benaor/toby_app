import { Icon } from "@components/Icon";
import { SquareButton } from "@components/SquareButton";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";

export type AcceptOrRefuseButtonProps =
  | {
      active: boolean;
      accept: boolean;
      onAccept: VoidFunction;
      refuse?: never;
      onRefuse?: never;
    }
  | {
      active: boolean;
      refuse: boolean;
      onRefuse: VoidFunction;
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
      <SquareButton size="small" style={styles.container} onPress={onAccept}>
        <Icon
          name="checkcircle"
          size={27}
          color={
            active
              ? theme.colors.secondary.high
              : theme.colors.background.medium
          }
        />
      </SquareButton>
    );
  };

  const RefuseButton = () => {
    return (
      <SquareButton size="small" style={styles.container} onPress={onRefuse}>
        <Icon
          name="closecircle"
          size={27}
          color={
            active
              ? theme.colors.primary.medium
              : theme.colors.background.medium
          }
        />
      </SquareButton>
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

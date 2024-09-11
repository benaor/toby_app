import { Icon } from "@components/Icon";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Pressable } from "react-native";

type ProfilButtonProps = {
  label: string;
  withIcon?: boolean;
  onPress?: VoidFunction;
};

export const ProfilButton: FC<ProfilButtonProps> = ({
  label,
  withIcon,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Typography.Body>{label}</Typography.Body>
      {withIcon && <Icon name="chevron-right" size={15} />}
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background.low,
    borderRadius: 10,
    alignItems: "center",
  },
}));

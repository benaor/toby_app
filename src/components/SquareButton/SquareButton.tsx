import { IconListFromExpo } from "@components/Button/IconListFromExpo.type";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";
import { Pressable, PressableProps } from "react-native";
import { Typography } from "..";
import { createStyleSheet } from "@themes/createStyleSheet";

type SquareButtonProps = PressableProps & {
  icon: IconListFromExpo;
  title: string;
};

export const SquareButton: FC<SquareButtonProps> = ({
  icon,
  title,
  ...pressableProps
}) => {
  const theme = useTheme();

  return (
    <Pressable {...pressableProps} style={styles.container}>
      <Typography.Body textAlign="center">
        <AntDesign
          name={icon}
          size={25}
          color={theme.colors.typography.medium}
        />
      </Typography.Body>
      <Typography.Body
        size="small"
        color="typography"
        lvlColor="medium"
        textAlign="center"
      >
        {title}
      </Typography.Body>
    </Pressable>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border.low,
    borderRadius: 5,
    display: "flex",
    width: 77,
    height: 65,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 5,
  },
}));

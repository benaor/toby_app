import { IconListFromExpo } from "@components/Button/IconListFromExpo.type";
import { IconButton } from "@components/IconButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

type HeaderProps = {
  title?: string;
  subtitle?: string;
} & (
  | {
      button: IconListFromExpo;
      onButtonPress: () => void;
    }
  | {
      button?: undefined;
      onButtonPress?: never;
    }
);

export const Header: FC<HeaderProps> = ({
  title,
  subtitle,
  button,
  onButtonPress,
}) => {
  const { back } = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.mainSection}>
        <IconButton name="arrowleft" onPress={back} />
        <View>
          {title && (
            <Typography.Header size="medium" color="primary" textAlign="center">
              {title}
            </Typography.Header>
          )}
        </View>
        {button ? (
          <IconButton name={button} onPress={onButtonPress} />
        ) : (
          <View />
        )}
      </View>
      {subtitle && (
        <Typography.Body size="small" color="typography" textAlign="center">
          {subtitle}
        </Typography.Body>
      )}
    </View>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.low,
    width: "100%",
    gap: 5,
    minHeight: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mainSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));

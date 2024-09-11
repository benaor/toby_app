import { IconButton } from "@components/IconButton";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import { IconListFromExpo } from "@utils/icons/IconListFromExpo";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View, ViewStyle } from "react-native";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  contrast?: boolean;
  canGoBack?: boolean;
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
  style,
  contrast,
  canGoBack,
  onButtonPress,
}) => {
  const { back } = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.mainSection}>
        {canGoBack && (
          <IconButton
            name="arrowleft"
            onPress={back}
            backgroundColor={contrast ? colors.background.medium : undefined}
          />
        )}
        <View>
          {title && (
            <Typography.Header size="medium" color="primary" textAlign="center">
              {title}
            </Typography.Header>
          )}
        </View>
        {button ? (
          <IconButton
            name={button}
            onPress={onButtonPress}
            backgroundColor={contrast ? colors.background.medium : undefined}
          />
        ) : (
          <View />
        )}
      </View>
      {subtitle && (
        <Typography.Body
          size="small"
          color="typography"
          textAlign={canGoBack ? "center" : "left"}
        >
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

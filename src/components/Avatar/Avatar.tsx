import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image, ImageStyle } from "react-native";

type AvatarProps = {
  uri: string;
  size?: number;
  style?: ImageStyle;
};

export const Avatar: FC<AvatarProps> = ({ uri, size = 30, style }) => {
  const styles = createStyleSheet(() => ({
    avatar: {
      ...style,
      width: size,
      height: size,
      borderRadius: 100,
    },
  }));

  return <Image source={{ uri }} style={styles.avatar} />;
};

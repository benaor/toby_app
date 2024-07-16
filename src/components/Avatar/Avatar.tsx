import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { Image } from "react-native";

type AvatarProps = {
  uri: string;
  size?: number;
};

export const Avatar: FC<AvatarProps> = ({ uri, size = 30 }) => {
  const styles = createStyleSheet(() => ({
    avatar: {
      width: size,
      height: size,
      borderRadius: 100,
    },
  }));

  return <Image source={{ uri }} style={styles.avatar} />;
};

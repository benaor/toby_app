import { IconButton } from "@components/IconButton";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useTheme } from "@themes/useTheme";
import { FC } from "react";
import { InputAccessoryView, View } from "react-native";

export const ChatBar: FC = () => {
  const theme = useTheme();
  return (
    <InputAccessoryView
      backgroundColor={theme.colors.background.low}
      style={styles.container}
    >
      <View style={styles.leftButtons}>
        <IconButton name="photo" size={20} />
        <IconButton name="photo-camera" size={20} />
      </View>

      <TextInput
        style={styles.textInput}
        variant="filled"
        placeholder="Message..."
      />

      <View style={styles.rightButtons}>
        <IconButton name="microphone" size={20} />
        <IconButton
          name="send-o"
          size={20}
          iconColor={theme.colors.primary.high}
        />
      </View>
    </InputAccessoryView>
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: theme.colors.background.low,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  leftButtons: {
    flex: 2.5,
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",
  },
  rightButtons: {
    flex: 2.5,
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    flex: 5.1,
    height: 25,
    minHeight: undefined,
    margin: "auto",
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
}));

import { IconButton } from "@components/IconButton";
import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { InputAccessoryView, View } from "react-native";

export const ChatBar: FC = () => {
  return (
    <InputAccessoryView style={styles.container}>
      <View style={styles.leftButtons}>
        <IconButton name={"picture"} size={15} />
      </View>

      <TextInput
        style={styles.textInput}
        variant="filled"
        placeholder="Message..."
      />

      <View style={styles.rightButtons}>
        <IconButton name="microphone" size={15} />
        <IconButton name="arrowright" size={15} />
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
  },
  leftButtons: {
    flex: 2,
    backgroundColor: "red",
  },
  rightButtons: {
    flex: 2,
    backgroundColor: "yellow",
  },
  textInput: {
    flex: 6,
  },
}));

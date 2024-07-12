import { TextInput } from "@components/TextInput";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";

export const ChatBar: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftButtons} />
      <TextInput style={styles.textInput} />
      <View style={styles.rightButtons} />
    </View>
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

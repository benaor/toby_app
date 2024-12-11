import { DateTimePicker } from "@components/DateTimePicker";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { FC } from "react";
import { View } from "react-native";

type DateTimeInputProps = {
  label?: string;
  value?: ISO8601;
  onChange: (value?: ISO8601) => void;
};

export const DateTimeInput: FC<DateTimeInputProps> = ({ label, ...props }) => {
  const Input = () => (
    <View style={styles.input}>
      <DateTimePicker mode="date" {...props} />
      <Typography.Body style={styles.separator}>à</Typography.Body>
      <DateTimePicker mode="time" {...props} />
    </View>
  );

  if (label)
    return (
      <View style={styles.container}>
        <Typography.Body>{label}</Typography.Body>
        <Input />
      </View>
    );

  return <Input />;
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    backgroundColor: theme.colors.background.medium,
    borderColor: theme.colors.border.medium,
    color: theme.colors.typography.high,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    minHeight: 46,
    paddingHorizontal: 0,
  },
  separator: {
    alignSelf: "center",
  },
}));

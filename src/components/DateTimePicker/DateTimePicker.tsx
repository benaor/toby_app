/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useCallback } from "react";
import { DateTimePickerProps } from "./DateTimePicker.props";
import { Platform, Pressable, View } from "react-native";
import NativeDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Typography } from "@components/Typography";
import { createStyleSheet } from "@themes/createStyleSheet";
import { ISO8601ToHHMM, ISO8601ToYYYYMMDD } from "@utils/dates/formatters";
import {
  createISO8601FromBasicDate,
  createISO8601FromBasicTime,
} from "@utils/dates/createDateFromBasics";

export const DateTimePicker: FC<DateTimePickerProps> = ({
  label,
  ...props
}) => {
  if (label)
    return (
      <View style={[styles.container]}>
        <Typography.Body>{label}</Typography.Body>
        <Component {...props} />
      </View>
    );

  return <Component {...props} />;
};

const Component: FC<Omit<DateTimePickerProps, "label">> = ({
  mode,
  onChange,
  value = new Date().toISOString(),
}) => {
  if (Platform.OS === "android") {
    const handleChange = useCallback(() => {
      if (mode === "date") {
        DateTimePickerAndroid.open({
          mode,
          value: new Date(value),
          onChange: (_, selectedDate) =>
            onChange && onChange(selectedDate?.toISOString()),
        });
      } else if (mode === "time" && onChange) {
        DateTimePickerAndroid.open({
          mode: "time",
          value: new Date(value),
          onChange: (_, selectedDate) =>
            onChange && onChange(selectedDate?.toISOString()),
        });
      }
    }, [mode, onChange, onChange, value]);

    return (
      <Pressable onPress={handleChange} style={styles.input}>
        <Typography.Body>
          {mode === "date" ? ISO8601ToYYYYMMDD(value) : ISO8601ToHHMM(value)}
        </Typography.Body>
      </Pressable>
    );
  }

  if (Platform.OS === "ios") {
    if (mode === "date") {
      return (
        <NativeDateTimePicker
          is24Hour
          value={new Date(value)}
          mode={mode}
          onChange={(_, selectedDate) =>
            onChange?.(selectedDate?.toISOString())
          }
        />
      );
    }

    return (
      <NativeDateTimePicker
        is24Hour
        value={new Date(value)}
        mode={mode}
        onChange={(_, selectedDate) => onChange?.(selectedDate?.toISOString())}
      />
    );
  }

  return (
    <input
      style={styles.input}
      type={mode}
      value={mode === "date" ? ISO8601ToYYYYMMDD(value) : ISO8601ToHHMM(value)}
      onChange={(e) => {
        if (mode === "date" && onChange)
          onChange(
            createISO8601FromBasicDate(e.target.value as BasicDate, {
              _time: value,
            }),
          );

        if (mode === "time" && onChange)
          onChange(
            createISO8601FromBasicTime(e.target.value as BasicTime, {
              _date: value,
            }),
          );
      }}
    />
  );
};

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderColor: theme.colors.border.medium,
    padding: 15,
    color: theme.colors.typography.high,
    backgroundColor: theme.colors.background.medium,
    borderWidth: 0,
    borderRadius: 10,
  },
}));

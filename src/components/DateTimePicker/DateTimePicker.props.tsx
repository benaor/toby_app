export type DateTimePickerProps = {
  label?: string;
  mode: "date" | "time";
  value?: ISO8601;
  onChange: (date?: ISO8601) => void;
};

import { isISO8601Before } from "./isISO8601Before";

describe("isISO8081Before", () => {
  it.each<[ISO8601, ISO8601, boolean]>([
    ["2020-01-01", "2020-01-02", true],
    ["2020-01-01", "2020-01-01", true],
    ["2020-01-01", "2020-01-00", false],
  ])(
    "should return true if the date is before or equal to the before date",
    (date, before, expected) => {
      const result = isISO8601Before(date, before);

      expect(result).toBe(expected);
    },
  );
});

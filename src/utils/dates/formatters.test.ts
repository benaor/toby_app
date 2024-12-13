import { ISO8601ToHHMM, ISO8601ToYYYYMMDD } from "./formatters";

describe("format date", () => {
  describe("ISO8601ToYYYYMMDD", () => {
    it.each`
      iso                                | separator    | expected
      ${"2020-01-01T00:00:00.000Z"}      | ${"/"}       | ${"2020/01/01"}
      ${"2020-01-01T00:00:00.000Z"}      | ${"-"}       | ${"2020-01-01"}
      ${"2024-01-12T00:00:00.000+01:00"} | ${"-"}       | ${"2024-01-12"}
      ${"2020-01-01T00:00:00.000+01:00"} | ${"/"}       | ${"2020/01/01"}
      ${"2020-01-01T00:00:00.000-01:00"} | ${"/"}       | ${"2020/01/01"}
      ${"2020-01-01T00:00:00.000-01:00"} | ${undefined} | ${"2020-01-01"}
    `(
      "should return the date in the format YYYY $separator MM $separator DD",
      ({ iso, separator, expected }) => {
        // When
        const result = ISO8601ToYYYYMMDD(iso, separator);

        // Then
        expect(result).toEqual(expected);
      },
    );
  });

  describe("ISO8601ToHHMM", () => {
    it.each`
      iso                                | separator    | expected
      ${"2020-01-01T00:00:00.000"}       | ${":"}       | ${"00:00"}
      ${"2020-01-01T00:00:00.000Z"}      | ${":"}       | ${"01:00"}
      ${"2020-01-01T12:00:00.000Z"}      | ${":"}       | ${"13:00"}
      ${"2024-01-12T23:59:00.000+01:00"} | ${":"}       | ${"23:59"}
      ${"2020-01-01T00:01:00.000+01:00"} | ${":"}       | ${"00:01"}
      ${"2020-01-01T00:01:00.000+01:00"} | ${undefined} | ${"00:01"}
    `(
      "should return the time in the format HH $separator MM",
      ({ iso, separator, expected }) => {
        // When
        const result = ISO8601ToHHMM(iso, separator);

        // Then
        expect(result).toEqual(expected);
      },
    );
  });
});

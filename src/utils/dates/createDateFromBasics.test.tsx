import {
  createISO8601FromBasicDate,
  createISO8601FromBasicTime,
} from "./createDateFromBasics";

describe("createDateFromBasicDate", () => {
  describe("createISO8601FromBasicTime", () => {
    it.each`
      time       | expected
      ${"00:00"} | ${"1999-12-31T23:00:00.000Z"}
      ${"12:00"} | ${"2000-01-01T11:00:00.000Z"}
      ${"23:59"} | ${"2000-01-01T22:59:00.000Z"}
      ${"00:01"} | ${"1999-12-31T23:01:00.000Z"}
      ${"00:00"} | ${"1999-12-31T23:00:00.000Z"}
    `(
      "should return the date with the time set to $time",
      ({ time, expected }) => {
        // Given
        Date.now = () => new Date("2000-01-01").getTime();

        // When
        const result = createISO8601FromBasicTime(time);

        // Then
        expect(result).toEqual(expected);
      },
    );

    it("should throw an error when the time is invalid", () => {
      // Given
      const time = "123:23454";

      // When
      const result = () => createISO8601FromBasicTime(time);

      // Then
      expect(result).toThrow("Invalid time format. Expected 'hh:mm'.");
    });
  });

  describe("createISO8601FromBasicDate", () => {
    it.each`
      date            | expected
      ${"2000-01-01"} | ${"2000-01-01T00:00:00.000Z"}
      ${"1999-12-31"} | ${"1999-12-31T00:00:00.000Z"}
      ${"2000-01-31"} | ${"2000-01-31T00:00:00.000Z"}
      ${"2004-02-29"} | ${"2004-02-29T00:00:00.000Z"}
      ${"2012-02-29"} | ${"2012-02-29T00:00:00.000Z"}
    `(
      "should return the date with the date set to $date",
      ({ date, expected }) => {
        // Given
        Date.now = () => new Date("2000-01-01T00:00:00.000Z").getTime();

        // When
        const result = createISO8601FromBasicDate(date);

        // Then
        expect(result).toEqual(expected);
      },
    );

    it("should throw an error when the date is invalid", () => {
      // Given
      const date = "124-132-352";

      // When
      const result = () => createISO8601FromBasicDate(date);

      // Then
      expect(result).toThrow("Invalid date format. Expected 'yyyy-mm-dd'.");
    });
  });
});

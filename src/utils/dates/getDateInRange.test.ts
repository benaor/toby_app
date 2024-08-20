import { getDatesInRange } from "./getDateInRange";

describe("getDatesInRange", () => {
  test.each([
    {
      description: "should return all dates between start and end (inclusive)",
      input: { start: new Date("2025-03-01"), end: new Date("2025-03-03") },
      expected: [
        new Date("2025-03-01"),
        new Date("2025-03-02"),
        new Date("2025-03-03"),
      ],
    },
    {
      description:
        "should return only the start date when start and end are the same",
      input: { start: new Date("2025-03-01"), end: new Date("2025-03-01") },
      expected: [new Date("2025-03-01")],
    },
    {
      description:
        "should return an empty array if end date is before start date",
      input: { start: new Date("2025-03-03"), end: new Date("2025-03-01") },
      expected: [],
    },
  ])("$description", ({ input, expected }) => {
    const result = getDatesInRange(input.start, input.end);

    expect(result).toHaveLength(expected.length);

    expected.forEach((date, index) => {
      expect(result[index]?.toISOString()).toBe(date.toISOString());
    });
  });
});

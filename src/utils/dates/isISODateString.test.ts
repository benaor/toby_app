import { isISO8601 } from "./isISODateString";

describe("is it ISO Date format ?", () => {
  it.each`
    stringDate                          | expected
    ${""}                               | ${false}
    ${"2020-01-01"}                     | ${true}
    ${"2020-01-01T00:00:00"}            | ${false}
    ${"2020-01-01T00:00:00Z"}           | ${true}
    ${"2020-01-01T00:00:00.000"}        | ${false}
    ${"2020-01-01T00:00:00.000Z"}       | ${true}
    ${"2020-01-01T00:00:00.000+01:00"}  | ${true}
    ${"2020-01-01T00:00:00.000-01:00"}  | ${true}
    ${"2020-01-01T00:00:00.000-01:00Z"} | ${false}
  `("$stringDate should return $expected", ({ expected, stringDate }) => {
    const isISODate = isISO8601(stringDate);

    expect(isISODate).toBe(expected);
  });
});

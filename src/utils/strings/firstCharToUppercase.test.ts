import { firstCharToUppercase } from "./firstCharToUppercase";

describe("firstCharToUppercase", () => {
  it.each`
    input      | expectedResult
    ${"hello"} | ${"Hello"}
    ${"world"} | ${"World"}
    ${"Test"}  | ${"Test"}
    ${"123"}   | ${"123"}
  `(
    "should return $expectedResult when $input is passed",
    ({ input, expectedResult }) => {
      expect(firstCharToUppercase(input)).toBe(expectedResult);
    },
  );
});

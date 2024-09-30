import { isNull } from "./isNull";

describe("isNull", () => {
  it("Should return true when value is null", () => {
    // ARRANGE
    const value = null;

    // ACT
    const res = isNull(value);

    // ASSERT
    expect(res).toBeTruthy();
  });

  it("Should return false when value is not null", () => {
    // ARRANGE
    const value = "Not null";

    // ACT
    const res = isNull(value);

    // ASSERT
    expect(res).toBeFalsy();
  });
});

import { Observable } from "./Observable";

describe("Observable", () => {
  it("Should add listener", async () => {
    // ARRANGE
    const observable = new Observable(1);
    const listener = jest.fn();

    // ACT
    observable.addEventListener(listener);
    observable.set(2);

    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("Should remove listener", async () => {
    // ARRANGE
    const observable = new Observable(1);
    const listener = jest.fn();

    // ACT
    const removeListener = observable.addEventListener(listener);
    removeListener();
    observable.set(2);

    // ASSERT
    expect(listener).toHaveBeenCalledTimes(0);
  });
});

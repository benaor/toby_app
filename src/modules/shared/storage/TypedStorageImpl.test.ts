import { InMemoryStorage } from "./InMemoryStorage";
import { TypedStorageImpl } from "./TypedStorageImpl";

describe("TypedStorageImpl", () => {
  test("getSession", () => {
    // ARRANGE
    const storage = new InMemoryStorage();
    const typedStorage = new TypedStorageImpl(storage);

    // ACT
    const result = typedStorage.getStorage();

    // ASSERT
    expect(result).toEqual(storage);
  });
});

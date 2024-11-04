import { createTestStore } from "@store/test-environment";
import { searchGuests } from "../searchGuests.usecase";
import { StubGuestsRepository } from "@events/core/adapters/StubGuestsRepository";
import { GuestFactory } from "@events/core/models/Guest.factory";

describe("Search guests", () => {
  describe("Happy path", () => {
    it("search field should be an empty, so results should be empty too", () => {
      // Arrange
      const store = createTestStore();

      // assert
      const { field, guests, status } = store.getState().creation.searchGuests;

      expect(status).toBe("idle");
      expect(field).toStrictEqual("");
      expect(guests).toStrictEqual([]);
    });

    it("search field should be : 'Benjamin' and array contains 5 items", async () => {
      const guestsRepository = new StubGuestsRepository(arrayOfGuests);

      // Arrange
      const guest = "Benjamin";
      const store = createTestStore({ dependencies: { guestsRepository } });

      store.dispatch(searchGuests(guest));

      const pending = store.getState().creation.searchGuests;
      expect(pending.field).toStrictEqual(guest);
      expect(pending.guests).toEqual([]);
      expect(pending.status).toBe("pending");

      // Act
      await new Promise((resolve) => setTimeout(resolve, 100));

      // assert
      const state = store.getState().creation.searchGuests;
      expect(state.field).toStrictEqual(guest);
      expect(state.guests).toEqual(arrayOfGuests);
      expect(state.status).toBe("idle");
    });

    it("search field should contains only one char so guests array should be empty", async () => {
      const guestsRepository = new StubGuestsRepository();

      // Arrange
      const guest = "B";
      const store = createTestStore({ dependencies: { guestsRepository } });

      // act
      store.dispatch(searchGuests(guest));
      await new Promise((resolve) => setTimeout(resolve, 100));

      // assert
      const { field, guests } = store.getState().creation.searchGuests;
      expect(field).toStrictEqual(guest);
      expect(guests).toEqual([]);
    });
  });
});

const arrayOfGuests = [
  GuestFactory.GUEST({ id: "1" }),
  GuestFactory.GUEST({ id: "2" }),
  GuestFactory.GUEST({ id: "3" }),
  GuestFactory.GUEST({ id: "4" }),
  GuestFactory.GUEST({ id: "5" }),
];

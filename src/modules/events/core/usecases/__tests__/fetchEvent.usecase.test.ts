import { createTestStore } from "@store/test-environment";
import { fetchEventsList } from "../fetchEvent.usecase";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";

describe("Fetch Event Usecase", () => {
  describe("When FetchEventList is fulfilled", () => {
    it("Status should be 'Idle' when nothing is dispatch", async () => {
      // Given
      const store = createTestStore();

      // When
      const eventList = store.getState().events.status;

      // Then
      expect(eventList).toBe("idle");
    });

    it("Should return an empty list when nothing is dispatch", async () => {
      // Given
      const store = createTestStore();

      // When
      const eventList = store.getState().events.entities;

      // Then
      expect(eventList).toStrictEqual({});
    });

    it("Status should be 'loading' when fetchEventList is pending", async () => {
      // Given
      const store = createTestStore();

      // When
      store.dispatch(fetchEventsList());
      const eventList = store.getState().events.entities;
      const status = store.getState().events.status;

      // Then
      expect(eventList).toStrictEqual({});
      expect(status).toBe("loading");
    });

    it("Should return a list with two items", async () => {
      // Given
      const myBirthday = EventFactory.EVENT({
        id: "birtday",
        title: "my birtday",
      });
      const musicParty = EventFactory.EVENT({
        id: "music",
        title: "music party",
      });

      const eventRepository = new StubEventRepository([myBirthday, musicParty]);
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchEventsList());
      const eventList = store.getState().events.entities;
      const status = store.getState().events.status;

      // Then
      expect(eventList).toStrictEqual({
        [myBirthday.id]: { ...myBirthday },
        [musicParty.id]: { ...musicParty },
      });
      expect(status).toBe("idle");
    });
  });

  describe("When FetchEventList is rejected", () => {
    it('Status should be "Error"', async () => {
      const eventRepository = new FailEventRepository();
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchEventsList());
      const status = store.getState().events.status;

      // Then
      expect(status).toBe("error");
    });

    it('list should be "empty"', async () => {
      const myBirthday = EventFactory.EVENT({ title: "my birtday" });
      const musicParty = EventFactory.EVENT({ title: "music party" });

      const eventRepository = new FailEventRepository();
      const store = createTestStore({
        dependencies: { eventRepository },
        initialState: {
          events: {
            ids: [myBirthday.id, musicParty.id],
            entities: {
              [myBirthday.id]: { ...myBirthday },
              [musicParty.id]: { ...musicParty },
            },
            status: "idle",
            error: null,
          },
        },
      });

      // When
      await store.dispatch(fetchEventsList());
      const eventsList = store.getState().events.entities;

      // Then
      expect(eventsList).toStrictEqual({});
    });

    it('Error message should be : an unexpected error happened"', async () => {
      const errorMsg = "an unexpected error happened";
      const eventRepository = new FailEventRepository(errorMsg);
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchEventsList());
      const error = store.getState().events.error;

      // Then
      expect(error).toBe(errorMsg);
    });
  });
});

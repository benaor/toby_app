import { createTestStore } from "@store/test-environment";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";
import { fetchArchivedEventsList } from "../fetchArchivedEvents.usecase";

describe("Fetch Archived Events Usecase", () => {
  describe("When FetchArchivedEvents is fulfilled", () => {
    it("Status should be 'Idle' when nothing is dispatch", async () => {
      // Given
      const store = createTestStore();

      // When
      const archives = store.getState().archives.status;

      // Then
      expect(archives).toBe("idle");
    });

    it("Should return an empty list when nothing is dispatch", async () => {
      // Given
      const store = createTestStore();

      // When
      const archivesList = store.getState().archives.entities;

      // Then
      expect(archivesList).toStrictEqual({});
    });

    it("Status should be 'loading' when fetchArchivedEventList is pending", async () => {
      // Given
      const store = createTestStore();

      // When
      store.dispatch(fetchArchivedEventsList());
      const archivesList = store.getState().archives.entities;
      const status = store.getState().archives.status;

      // Then
      expect(archivesList).toStrictEqual({});
      expect(status).toBe("loading");
    });

    it("Should return a list with two items", async () => {
      // Given
      const myBirthday = EventFactory.ARCHIVED_EVENT({
        id: "birtday",
        title: "my birtday",
      });
      const musicParty = EventFactory.ARCHIVED_EVENT({
        id: "music",
        title: "music party",
      });

      const eventRepository = new StubEventRepository([myBirthday, musicParty]);
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchArchivedEventsList());
      const archivesList = store.getState().archives.entities;
      const status = store.getState().archives.status;

      // Then
      expect(archivesList).toStrictEqual({
        [myBirthday.id]: { ...myBirthday },
        [musicParty.id]: { ...musicParty },
      });
      expect(status).toBe("idle");
    });

    it("Error should be null after success", async () => {
      const eventRepository = new StubEventRepository();
      const store = createTestStore({
        dependencies: { eventRepository },
        initialState: {
          archives: {
            entities: {},
            ids: [],
            status: "error",
            error: "an error occured",
          },
        },
      });

      // When
      await store.dispatch(fetchArchivedEventsList());
      const error = store.getState().archives.error;
      const status = store.getState().archives.status;

      // Then
      expect(error).toBe(null);
      expect(status).toBe("idle");
    });
  });

  describe("When FetchArchivedEventList is rejected", () => {
    it('Status should be "Error"', async () => {
      const eventRepository = new FailEventRepository();
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchArchivedEventsList());
      const status = store.getState().archives.status;

      // Then
      expect(status).toBe("error");
    });

    it('list should be "empty"', async () => {
      const myBirthday = EventFactory.ARCHIVED_EVENT({ title: "my birtday" });
      const musicParty = EventFactory.ARCHIVED_EVENT({ title: "music party" });

      const eventRepository = new FailEventRepository();
      const store = createTestStore({
        dependencies: { eventRepository },
        initialState: {
          archives: {
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
      await store.dispatch(fetchArchivedEventsList());
      const eventsList = store.getState().archives.entities;

      // Then
      expect(eventsList).toStrictEqual({});
    });

    it('Error message should be : an unexpected error happened"', async () => {
      const errorMsg = "an unexpected error happened";
      const eventRepository = new FailEventRepository(errorMsg);
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchArchivedEventsList());
      const error = store.getState().archives.error;

      // Then
      expect(error).toBe(errorMsg);
    });

    it('Error message should be : Une erreur est survenue"', async () => {
      const eventRepository = new FailEventRepository();
      const store = createTestStore({ dependencies: { eventRepository } });

      // When
      await store.dispatch(fetchArchivedEventsList());
      const error = store.getState().archives.error;

      // Then
      expect(error).toBe("Une erreur est survenue");
    });
  });
});

import { createTestStore, waitForListeners } from "@store/test-environment";
import { createEvent } from "../createEvent.usecase";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { AppStore } from "@store/store";
import { EventRepository } from "@events/core/ports/EventRepository";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";
import {
  creationActions,
  CreationState,
  initialCreationState,
} from "@events/core/slices/creation.slice";
import { EventFactory } from "@events/core/models/Event.factory";

describe("Create Event", () => {
  describe("Happy path", () => {
    let store: AppStore;
    let eventRepository: EventRepository;

    beforeEach(() => {
      eventRepository = new StubEventRepository();
      store = createTestStore({
        dependencies: { eventRepository },
        initialState,
      });
    });

    it("Status should be update while creating event", async () => {
      // Arrange
      const before = store.getState().creation;
      expect(before.status).toBe("idle");

      // Act - pending
      const promise = store.dispatch(createEvent());

      const pending = store.getState().creation;
      expect(pending.status).toBe("pending");

      // Act - fulfilled
      await promise;

      // Assert
      const after = store.getState().creation;
      expect(after.status).toBe("idle");
    });

    it("Repository should be called with the form data", async () => {
      // Act
      await store.dispatch(createEvent());
      const { form } = store.getState().creation;

      // Assert
      expect(eventRepository.createEvent).toHaveBeenCalledTimes(1);
      expect(eventRepository.createEvent).toHaveBeenCalledWith(form);
    });

    it("Error should be remove", async () => {
      // Arrange
      store = createTestStore({
        dependencies: { eventRepository },
        initialState: {
          ...initialState,
          creation: {
            ...initialStateCreation,
            error: "Some error",
            status: "error",
          },
        },
      });

      const before = store.getState().creation;
      expect(before.status).toBe("error");
      expect(before.error).toBe("Some error");

      // Act - pending
      const promise = store.dispatch(createEvent());

      const pending = store.getState().creation;
      expect(pending.status).toBe("pending");

      // Act - fulfilled
      await promise;

      // Assert
      const after = store.getState().creation;
      expect(after.status).toBe("idle");
      expect(after.error).toBeNull();
    });

    it("Event should be added to the list", async () => {
      // Arrange
      const userEvent = EventFactory.USER_EVENT({
        id: "123",
        title: initialState.creation.form.title!,
        description: initialState.creation.form.description!,
      });

      eventRepository = new StubEventRepository([userEvent]);
      store = createTestStore({
        dependencies: { eventRepository },
        initialState,
      });

      // Act
      await store.dispatch(createEvent());
      await waitForListeners();

      // Assert
      const { ids, entities } = store.getState().events;
      expect(ids).toHaveLength(1);
      expect(entities[ids[0]]).toBeDefined();
    });

    it("Should clean the store", async () => {
      store = createTestStore({ initialState });

      // Act
      store.dispatch(creationActions.clear());

      // Assert
      const state = store.getState().creation;
      expect(state).toStrictEqual(initialCreationState);
    });
  });

  describe("Failed path", () => {
    let store: AppStore;
    let eventRepository: EventRepository;
    const errorMessage = "Failed to create event";

    beforeEach(() => {
      eventRepository = new FailEventRepository(errorMessage);
      store = createTestStore({
        dependencies: { eventRepository },
        initialState,
      });
    });

    it("Status should be update while creating event", async () => {
      // Arrange
      const before = store.getState().creation;
      expect(before.status).toBe("idle");

      // Act - pending
      const promise = store.dispatch(createEvent());

      const pending = store.getState().creation;
      expect(pending.status).toBe("pending");

      // Act - fulfilled
      await promise;

      // Assert
      const after = store.getState().creation;
      expect(after.status).toBe("error");
    });

    it("Error should be defined", async () => {
      // Arrange
      const before = store.getState().creation;
      expect(before.error).toBeNull();

      // Act
      await store.dispatch(createEvent());

      // Assert
      const after = store.getState().creation;
      expect(after.error).toBe(errorMessage);
    });
  });
});

const initialStateCreation: CreationState = {
  ...initialCreationState,
  form: {
    type: "birthday",
    title: "My birthday",
    description: "My birthday",
    image: "image",
    guests: [],
    modules: {
      location: false,
      activity: false,
      budget: false,
      cagnotte: false,
    },
    date: {
      start: new Date(Date.now()).toISOString(),
      end: null,
    },
    location: {
      address: "My address",
      name: "My location",
    },
  },
  error: null,
  status: "idle",
};

const initialState = {
  creation: {
    ...initialStateCreation,
  },
};

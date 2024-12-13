import { createTestStore, waitForListeners } from "@store/test-environment";
import { createEvent } from "../createEvent.usecase";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { AppStore } from "@store/store";
import { EventRepository } from "@events/core/ports/EventRepository";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";
import {
  creationActions,
  initialCreationState,
} from "@events/core/slices/creation.slice";
import { EventFactory } from "@events/core/models/Event.factory";
import { produce } from "immer";
import { EventForm } from "@events/core/models/EventForm.model";

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
        initialState: produce(initialState, (draft) => {
          draft.creation.error = "Some error";
          draft.creation.status = "error";
        }),
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

      if (!ids[0]) throw new Error("Event id is not defined");

      expect(entities[ids[0]]).toBeDefined();
    });

    it("Should clean the store", async () => {
      // Act
      store.dispatch(creationActions.clear());

      // Assert
      const state = store.getState().creation;
      expect(state).toStrictEqual(initialCreationState);
    });
  });

  describe("Failed path", () => {
    describe("Error from useCase", () => {
      type NullableKeyOfEventForm = Exclude<
        keyof EventForm,
        "modules" | "date" | "location" | "guests"
      >;

      it.each<[NullableKeyOfEventForm, string]>([
        ["type", "Event type is required"],
        ["title", "Title is required"],
        ["description", "Description is required"],
        ["image", "Image is required"],
      ])("Should throw an error if %s is not defined", async (field, error) => {
        // Arrange
        const eventRepository = new StubEventRepository();
        const store = createTestStore({
          dependencies: { eventRepository },
          initialState: produce(initialState, (draft) => {
            draft.creation.form[field] = null;
          }),
        });

        // Act
        await store.dispatch(createEvent());

        // Assert
        const { error: errorMessage } = store.getState().creation;
        expect(errorMessage).toBe(error);
      });

      it.each<keyof EventForm["location"]>(["address", "name"])(
        "Should throw an error if location is not defined",
        async (name) => {
          // Arrange
          const eventRepository = new StubEventRepository();
          const store = createTestStore({
            dependencies: { eventRepository },
            initialState: produce(initialState, (draft) => {
              draft.creation.form.location[name] = null;
            }),
          });

          // Act
          await store.dispatch(createEvent());

          // Assert
          const { error: errorMessage } = store.getState().creation;
          expect(errorMessage).toBe("Location is required");
        },
      );

      it("Should throw an error if date.start is not defined", async () => {
        // Arrange
        const eventRepository = new StubEventRepository();
        const store = createTestStore({
          dependencies: { eventRepository },
          initialState: produce(initialState, (draft) => {
            draft.creation.form.date.start = null;
          }),
        });

        // Act
        await store.dispatch(createEvent());

        // Assert
        const { error: errorMessage } = store.getState().creation;
        expect(errorMessage).toBe("Start date is required");
      });
    });

    describe("Error from repository", () => {
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
});

const creation = produce(initialCreationState, (draft) => {
  draft.form.type = "birthday";
  draft.form.title = "My birthday";
  draft.form.description = "My birthday";
  draft.form.image = "image";
  draft.form.date = {
    start: new Date("2024-05-25").toISOString(),
    end: null,
  };
  draft.form.location = {
    address: "My address",
    name: "My location",
  };
});

const initialState = {
  creation: {
    ...creation,
  },
};

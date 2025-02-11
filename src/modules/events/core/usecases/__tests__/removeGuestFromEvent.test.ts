import { EventFactory } from "@events/core/models/Event.factory";
import { GuestFactory } from "@events/core/models/Guest.factory";
import { removeGuestFromEvent } from "../removeGuestFromEvent";
import { createTestStore } from "@store/test-environment";
import { eventsInitialState } from "@events/core/slices/event.slice";
import { produce } from "immer";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";

describe("removeGuestFromEvent", () => {
  it("should remove a guest from an event and perform optimistic update", async () => {
    const eventRepository = new StubEventRepository();
    const guestOne = GuestFactory.GUEST({ id: "1" });
    const guestTwo = GuestFactory.GUEST({ id: "2" });

    const event = EventFactory.USER_EVENT({
      guests: [guestOne, guestTwo],
    });

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
      dependencies: { eventRepository },
    });

    const promise = store.dispatch(
      removeGuestFromEvent({
        eventId: event.id,
        guestId: guestOne.id,
      }),
    );

    let updatedEvent = store.getState().events.entities[event.id];
    expect(updatedEvent?.guests).not.toContain(guestOne);

    await promise;

    updatedEvent = store.getState().events.entities[event.id];
    expect(updatedEvent?.guests).not.toContain(guestOne);
  });

  it("should revert optimistic update if the server call fails", async () => {
    const eventRepository = new FailEventRepository("Error");

    const guestOne = GuestFactory.GUEST({ id: "1" });
    const guestTwo = GuestFactory.GUEST({ id: "2" });

    const event = EventFactory.USER_EVENT({
      guests: [guestOne, guestTwo],
    });

    const store = createTestStore({
      dependencies: { eventRepository },
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const promise = store.dispatch(
      removeGuestFromEvent({
        eventId: event.id,
        guestId: guestOne.id,
      }),
    );

    let updatedEvent = store.getState().events.entities[event.id];
    expect(updatedEvent?.guests).not.toContain(guestOne);

    await promise;

    updatedEvent = store.getState().events.entities[event.id];
    expect(updatedEvent?.guests).toContain(guestOne);
  });
});

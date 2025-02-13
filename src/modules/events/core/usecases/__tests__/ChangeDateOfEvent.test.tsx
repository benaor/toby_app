import { EventFactory } from "@events/core/models/Event.factory";
import { eventsInitialState } from "@events/core/slices/event.slice";
import { createTestStore } from "@store/test-environment";
import { produce } from "immer";
import { ChangeDateOfEvent } from "../ChangeDateOfEvent";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";

describe("ChangeDateOfEvent", () => {
  it("should change the date of an event", async () => {
    const oldStartDate = new Date("2025-01-01").toISOString();
    const oldEndDate = null;

    const newStartDate = new Date("2025-01-02").toISOString();
    const newEndDate = new Date("2025-01-03").toISOString();

    const event = EventFactory.USER_EVENT({
      date: {
        start: oldStartDate,
        end: oldEndDate,
      },
    });

    const eventRepository = new StubEventRepository();

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
      dependencies: { eventRepository },
    });

    await store.dispatch(
      ChangeDateOfEvent({
        eventId: event.id,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );

    const updatedEvent = store.getState().events.entities[event.id];

    expect(updatedEvent?.date.start).toBe(newStartDate);
    expect(updatedEvent?.date.end).toBe(newEndDate);
  });

  it("should change the date of an event", async () => {
    const oldStartDate = new Date("2025-01-01").toISOString();
    const oldEndDate = null;

    const newStartDate = new Date("2025-01-02").toISOString();
    const newEndDate = new Date("2025-01-03").toISOString();

    const event = EventFactory.USER_EVENT({
      date: {
        start: oldStartDate,
        end: oldEndDate,
      },
    });

    const eventRepository = new StubEventRepository();

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
      dependencies: { eventRepository },
    });

    await store.dispatch(
      ChangeDateOfEvent({
        eventId: event.id,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );

    const updatedEvent = store.getState().events.entities[event.id];

    expect(updatedEvent?.date.start).toBe(newStartDate);
    expect(updatedEvent?.date.end).toBe(newEndDate);
  });

  it("should not change the date when request fails", async () => {
    const oldStartDate = new Date("2025-01-01").toISOString();
    const oldEndDate = null;

    const newStartDate = new Date("2025-01-02").toISOString();
    const newEndDate = new Date("2025-01-03").toISOString();

    const event = EventFactory.USER_EVENT({
      date: {
        start: oldStartDate,
        end: oldEndDate,
      },
    });

    const eventRepository = new FailEventRepository();

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
      dependencies: { eventRepository },
    });

    await store.dispatch(
      ChangeDateOfEvent({
        eventId: event.id,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );

    const updatedEvent = store.getState().events.entities[event.id];

    expect(updatedEvent?.date.start).toBe(oldStartDate);
    expect(updatedEvent?.date.end).toBe(oldEndDate);
  });
});

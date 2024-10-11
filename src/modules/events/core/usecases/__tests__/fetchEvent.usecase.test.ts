import { createTestStore } from "@store/test-environment";
import { fetchEventsList } from "../fetchEvent.usecase";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";

describe("Fetch Event Usecase", () => {
  it("Should return an empty list", async () => {
    // Given
    const store = createTestStore();

    // When
    await store.dispatch(fetchEventsList);
    const eventList = store.getState().events.eventsList;

    // Then
    expect(eventList).toStrictEqual([]);
  });

  it("Should return a list with two items", async () => {
    // Given
    const myBirthday = EventFactory.EventListItem({ title: "my birtday" });
    const musicParty = EventFactory.EventListItem({ title: "music party" });

    const eventRepository = new StubEventRepository([myBirthday, musicParty]);
    const store = createTestStore({ dependencies: { eventRepository } });

    // When
    await store.dispatch(fetchEventsList);
    const eventList = store.getState().events.eventsList;

    // Then
    expect(eventList).toStrictEqual([myBirthday, musicParty]);
  });
});

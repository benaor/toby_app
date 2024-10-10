import { createTestStore } from "@store/test-environment";
import { fetchEventsList } from "../fetchEvent.usecase";

describe("Fetch Event Usecase", () => {
  xit("Should return an empty list", async () => {
    // Given
    const store = createTestStore();

    // When
    store.dispatch(fetchEventsList);
    const eventList = store.getState().events.eventsList;

    // Then
    expect(eventList).toBe([]);
  });
});

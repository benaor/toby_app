import { createTestState } from "@store/test-environment";
import { eventsSelector } from "./events.selector";
import { EventState } from "../slices/event.slice";
import { EventFactory } from "../models/Event.factory";

describe("Events Selector", () => {
  it("should return the empty event list", () => {
    // Given
    const events: EventState = {
      ids: [],
      entities: {},
      status: "idle",
      error: null,
    };

    const state = createTestState({ events });

    // When
    const result = eventsSelector(state);

    // Then
    expect(result).toStrictEqual([]);
  });

  it("should return the empty event list", () => {
    // Given
    const myBirthday = EventFactory.EventListItem({
      id: "birth-id",
      title: "my birtday",
    });
    const musicParty = EventFactory.EventListItem({
      id: "music-id",
      title: "music party",
    });

    const events: EventState = {
      ids: [myBirthday.id, musicParty.id],
      entities: {
        [myBirthday.id]: { ...myBirthday },
        [musicParty.id]: { ...musicParty },
      },
      status: "idle",
      error: null,
    };

    const state = createTestState({ events });

    // When
    const result = eventsSelector(state);

    // Then
    expect(result).toStrictEqual([myBirthday, musicParty]);
  });
});

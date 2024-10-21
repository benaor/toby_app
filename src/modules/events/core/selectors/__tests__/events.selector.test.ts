import { createTestState } from "@store/test-environment";
import { allEventsSelector, eventsStateSelector } from "../events.selector";
import { EventState } from "../../slices/event.slice";
import { EventFactory } from "../../models/Event.factory";

describe("Events Selector", () => {
  describe("eventsEntitiesSelector", () => {
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
      const result = allEventsSelector(state);

      // Then
      expect(result).toStrictEqual([]);
    });

    it("should return the event list with 2 items", () => {
      // Given
      const myBirthday = EventFactory.EVENT({
        id: "birth-id",
        title: "my birtday",
      });
      const musicParty = EventFactory.EVENT({
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
      const result = allEventsSelector(state);

      // Then
      expect(result).toStrictEqual([myBirthday, musicParty]);
    });
  });

  describe("eventsStateSelector", () => {
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
      const result = eventsStateSelector(state);

      // Then
      expect(result).toStrictEqual(events);
    });

    it("should return the event list with 2 items", () => {
      // Given
      const myBirthday = EventFactory.EVENT({
        id: "birth-id",
        title: "my birtday",
      });
      const musicParty = EventFactory.EVENT({
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
      const result = eventsStateSelector(state);

      // Then
      expect(result).toStrictEqual(events);
    });
  });
});

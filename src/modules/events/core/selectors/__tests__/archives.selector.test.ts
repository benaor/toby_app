import { createTestState } from "@store/test-environment";
import {
  allArchivesSelector,
  archivesStateSelector,
} from "../archives.selector";

import { EventFactory } from "../../models/Event.factory";
import { ArchivesState } from "@events/core/slices/archives.slices";

describe("Archives Selector", () => {
  describe("archivesEntitiesSelector", () => {
    it("should return the empty archive list", () => {
      // Given
      const archives: ArchivesState = {
        ids: [],
        entities: {},
        status: "idle",
        error: null,
      };

      const state = createTestState({ archives });

      // When
      const result = allArchivesSelector(state);

      // Then
      expect(result).toStrictEqual([]);
    });

    it("should return the empty archive list", () => {
      // Given
      const myBirthday = EventFactory.ARCHIVED_EVENT({
        id: "birth-id",
        title: "my birtday",
      });
      const musicParty = EventFactory.ARCHIVED_EVENT({
        id: "music-id",
        title: "music party",
      });

      const archives: ArchivesState = {
        ids: [myBirthday.id, musicParty.id],
        entities: {
          [myBirthday.id]: { ...myBirthday },
          [musicParty.id]: { ...musicParty },
        },
        status: "idle",
        error: null,
      };

      const state = createTestState({ archives });

      // When
      const result = allArchivesSelector(state);

      // Then
      expect(result).toStrictEqual([myBirthday, musicParty]);
    });
  });

  describe("archivesStateSelector", () => {
    it("should return the empty archive list", () => {
      // Given
      const archives: ArchivesState = {
        ids: [],
        entities: {},
        status: "idle",
        error: null,
      };

      const state = createTestState({ archives });

      // When
      const result = archivesStateSelector(state);

      // Then
      expect(result).toStrictEqual(archives);
    });

    it("should return the empty archive list", () => {
      // Given
      const archives: ArchivesState = {
        ids: [],
        entities: {},
        status: "error",
        error: "An Error occurred",
      };

      const state = createTestState({ archives });

      // When
      const result = archivesStateSelector(state);

      // Then
      expect(result).toStrictEqual(archives);
    });
  });
});

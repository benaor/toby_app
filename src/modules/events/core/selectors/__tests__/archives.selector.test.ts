import { createTestState } from "@store/test-environment";
import {
  archivesErrorSelector,
  archivesEntitiesSelector,
  archivesStatusSelector,
} from "../archives.selector";

import { EventFactory } from "../../models/Event.factory";
import { ArchivesState } from "@events/core/slices/archives.slices";

describe("Archives Selector", () => {
  describe("archivesSelector", () => {
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
      const result = archivesEntitiesSelector(state);

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
      const result = archivesEntitiesSelector(state);

      // Then
      expect(result).toStrictEqual([myBirthday, musicParty]);
    });
  });

  describe("archivesStatusSelector", () => {
    it("should return the status of the archives", () => {
      // Given
      const archives: ArchivesState = {
        ids: [],
        entities: {},
        status: "loading",
        error: null,
      };

      const state = createTestState({ archives });

      // When
      const result = archivesStatusSelector(state);

      // Then
      expect(result).toBe("loading");
    });
  });

  describe("archivesErrorSelector", () => {
    it("should return the error of the archives", () => {
      // Given
      const archives: ArchivesState = {
        ids: [],
        entities: {},
        status: "error",
        error: "An error occurred",
      };

      const state = createTestState({ archives });

      // When
      const result = archivesErrorSelector(state);

      // Then
      expect(result).toBe("An error occurred");
    });
  });
});

import { createTestState } from "@store/test-environment";

import { initialCreationState } from "@events/core/slices/creation.slice";
import { produce } from "immer";
import { creationFormSelector } from "../creation.selector";

describe("CreationSelector", () => {
  describe("creation form", () => {
    it("should return empty state", () => {
      const state = createTestState();

      // When
      const result = creationFormSelector(state);

      // Then
      expect(result).toStrictEqual(initialCreationState.form);
    });

    it("should return the form with value", () => {
      // Given
      const creation = produce(initialCreationState, (draft) => {
        draft.form.type = "weekend";
        draft.form.title = "Weekend at the beach";
        draft.form.description = "Let's go to the beach";
      });
      const state = createTestState({ creation });

      // When
      const result = creationFormSelector(state);

      // Then
      expect(result).toStrictEqual(creation.form);
    });
  });
});

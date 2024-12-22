import { createTestState } from "@store/test-environment";

import { initialCreationState } from "@events/core/slices/creation.slice";
import { produce } from "immer";
import {
  creationFormSelector,
  creationSearchGuestsSelector,
  creationStepSelector,
} from "../creation.selector";
import { CreationStep } from "@events/core/models/EventForm.model";
import { GuestFactory } from "@events/core/models/Guest.factory";

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
  describe("creation Step", () => {
    it("should return Step one (chooseEvent)", () => {
      const state = createTestState();

      // When
      const result = creationStepSelector(state);

      // Then
      expect(result).toStrictEqual(CreationStep.ChooseEvent);
    });

    it("Should return step 3 (AddGuestsToEvent)", () => {
      // Given
      const creation = produce(initialCreationState, (draft) => {
        draft.step = CreationStep.AddGuestsToEvent;
      });
      const state = createTestState({ creation });

      // When
      const result = creationStepSelector(state);

      // Then
      expect(result).toStrictEqual(CreationStep.AddGuestsToEvent);
    });
  });

  describe("creation search guests", () => {
    it("should return empty search guests", () => {
      const state = createTestState();

      // When
      const result = creationSearchGuestsSelector(state);

      // Then
      expect(result).toStrictEqual(initialCreationState.searchGuests);
    });

    it("should return search guests with value", () => {
      const suggestedGuest = GuestFactory.GUEST({ id: "1", name: "John" });
      const searchGuests = {
        field: "john",
        guests: [suggestedGuest],
        status: "idle" as const,
        error: null,
      };

      // Given
      const creation = produce(initialCreationState, (draft) => {
        draft.searchGuests = searchGuests;
      });

      const state = createTestState({ creation });

      // When
      const result = creationSearchGuestsSelector(state);

      // Then
      expect(result).toStrictEqual(searchGuests);
    });
  });
});

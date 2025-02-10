import { createTestStore } from "@store/test-environment";
import { goBackToPreviousStep } from "../goBackToPreviousStep";
import { produce } from "immer";
import { CreationStep } from "@events/core/models/EventForm.model";
import { initialCreationState } from "@events/core/slices/creation.slice";

describe("goBackToPreviousStep", () => {
  // This tuple is [currentStep, previousStep]
  it.each<{
    currentStep: CreationStep;
    previousStep: CreationStep;
  }>([
    {
      currentStep: CreationStep.AddEventModules,
      previousStep: CreationStep.AddGuestsToEvent,
    },
    {
      currentStep: CreationStep.AddGuestsToEvent,
      previousStep: CreationStep.EventAdditionalInfos,
    },
    {
      currentStep: CreationStep.EventAdditionalInfos,
      previousStep: CreationStep.EventInformations,
    },
    {
      currentStep: CreationStep.EventInformations,
      previousStep: CreationStep.ChooseEvent,
    },
  ])(
    "I can go back to the previous step from $currentStep to $previousStep",
    async ({ currentStep, previousStep }) => {
      const store = createTestStore({
        initialState: {
          creation: produce(initialCreationState, (draft) => {
            draft.step = currentStep;
          }),
        },
      });

      store.dispatch(goBackToPreviousStep());

      const newStep = store.getState().creation.step;
      expect(newStep).toEqual(previousStep);
    },
  );
});

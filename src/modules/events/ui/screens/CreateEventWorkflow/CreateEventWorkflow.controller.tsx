import { CreationStep } from "@events/core/models/Creation.model";

export const useCreateEventWorkflow = () => {
  const step = CreationStep.ChooseEvent;

  return {
    step,
  };
};

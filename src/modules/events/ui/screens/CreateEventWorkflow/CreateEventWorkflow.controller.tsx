import { CreationStep } from "@events/core/models/EventForm.model";

export const useCreateEventWorkflow = () => {
  const step = CreationStep.ChooseEvent;

  return {
    step,
  };
};

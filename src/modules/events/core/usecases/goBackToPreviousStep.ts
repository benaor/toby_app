import { AppDispatch, AppGetState } from "@store/store";
import { CreationStep } from "../models/EventForm.model";
import { creationActions } from "../slices/creation.slice";

export const goBackToPreviousStep =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const currentStep = getState().creation.step;

    if (currentStep === CreationStep.AddEventModules)
      dispatch(creationActions.setStep(CreationStep.AddGuestsToEvent));

    if (currentStep === CreationStep.AddGuestsToEvent)
      dispatch(creationActions.setStep(CreationStep.EventAdditionalInfos));

    if (currentStep === CreationStep.EventAdditionalInfos)
      dispatch(creationActions.setStep(CreationStep.EventInformations));

    if (currentStep === CreationStep.EventInformations)
      dispatch(creationActions.setStep(CreationStep.ChooseEvent));
  };

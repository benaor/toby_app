import { AddEventModulesModal } from "@/src/modules/events/ui/screens/AddEventModulesModal";
import { AddGuestsToEventModal } from "@/src/modules/events/ui/screens/AddGuestsToEventModal";
import { ChooseEventModal } from "@/src/modules/events/ui/screens/ChooseEventModal";
import { EventAdditionalInfosModal } from "@/src/modules/events/ui/screens/EventAdditionalInfosModal";
import { EventInformationsModal } from "@/src/modules/events/ui/screens/EventInformationsModal";
import { useCreateEventWorkflow } from "./CreateEventWorkflow.controller";
import { CreationStep } from "@events/core/models/EventForm.model";

export const CreateEventWorkflow = () => {
  const { step } = useCreateEventWorkflow();

  return (
    <>
      {step === CreationStep.ChooseEvent && <ChooseEventModal />}
      {step === CreationStep.EventInformations && <EventInformationsModal />}
      {step === CreationStep.EventAdditionalInfos && (
        <EventAdditionalInfosModal />
      )}
      {step === CreationStep.AddGuestsToEvent && <AddGuestsToEventModal />}
      {step === CreationStep.AddEventModules && <AddEventModulesModal />}
    </>
  );
};

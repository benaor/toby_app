import { AddEventModulesModal } from "@/src/modules/events/ui/screens/AddEventModulesModal";
import { AddGuestsToEventModal } from "@/src/modules/events/ui/screens/AddGuestsToEventModal";
import { ChooseEventModal } from "@/src/modules/events/ui/screens/ChooseEventModal";
import { EventAdditionalInfosModal } from "@/src/modules/events/ui/screens/EventAdditionalInfosModal";
import { EventInformationsModal } from "@/src/modules/events/ui/screens/EventInformationsModal";

export default function createEventModal() {
  const step: number = 5;
  return (
    <>
      {step === 1 && <ChooseEventModal />}
      {step === 2 && <EventInformationsModal />}
      {step === 3 && <EventAdditionalInfosModal />}
      {step === 4 && <AddGuestsToEventModal />}
      {step === 5 && <AddEventModulesModal />}
    </>
  );
}

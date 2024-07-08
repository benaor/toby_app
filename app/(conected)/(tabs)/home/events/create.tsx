import { ChooseEventModal } from "@/src/modules/events/ui/screens/ChooseEventModal";
import { EventAdditionalInfosModal } from "@/src/modules/events/ui/screens/EventAdditionalInfosModal";
import { EventInformationsModal } from "@/src/modules/events/ui/screens/EventInformationsModal";

export default function createEventModal() {
  const step: number = 3;
  return (
    <>
      {step === 1 && <ChooseEventModal />}
      {step === 2 && <EventInformationsModal />}
      {step === 3 && <EventAdditionalInfosModal />}
    </>
  );
}

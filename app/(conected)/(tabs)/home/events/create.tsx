import { ChooseEventModal } from "@/src/modules/events/ui/screens/ChooseEventModal";
import { EventInformationsModal } from "@/src/modules/events/ui/screens/EventInformationsModal";

export default function createEventModal() {
  const step: number = 2;
  return (
    <>
      {step === 1 && <ChooseEventModal />}
      {step === 2 && <EventInformationsModal />}
    </>
  );
}

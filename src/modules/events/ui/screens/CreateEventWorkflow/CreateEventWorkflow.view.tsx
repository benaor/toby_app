import React from "react";
import { AddEventModulesModal } from "@/src/modules/events/ui/screens/AddEventModulesModal";
import { AddGuestsToEventModal } from "@/src/modules/events/ui/screens/AddGuestsToEventModal";
import { ChooseEventModal } from "@/src/modules/events/ui/screens/ChooseEventModal";
import { EventAdditionalInfosModal } from "@/src/modules/events/ui/screens/EventAdditionalInfosModal";
import { EventInformationsModal } from "@/src/modules/events/ui/screens/EventInformationsModal";
import { useCreateEventWorkflow } from "./CreateEventWorkflow.controller";
import { CreationStep } from "@events/core/models/EventForm.model";

export const CreateEventWorkflow = () => {
  const { step } = useCreateEventWorkflow();

  switch (step) {
    case CreationStep.ChooseEvent:
      return <ChooseEventModal />;

    case CreationStep.EventInformations:
      return <EventInformationsModal />;

    case CreationStep.EventAdditionalInfos:
      return <EventAdditionalInfosModal />;

    case CreationStep.AddGuestsToEvent:
      return <AddGuestsToEventModal />;

    case CreationStep.AddEventModules:
      return <AddEventModulesModal />;
  }
};

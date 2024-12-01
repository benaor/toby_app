import { EventType } from "@events/core/models/EventForm.model";
import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { chooseTypeOfEvent } from "@events/core/usecases/chooseTypeOfEvent.usecase";
import { useAppDispatch } from "@store/useAppDispatch";
import { useSelector } from "react-redux";

export const useChooseEventModal = () => {
  const dispatch = useAppDispatch();
  const eventType = useSelector(creationFormSelector).type;

  const chooseType = (type: EventType) => {
    dispatch(chooseTypeOfEvent(type));
  };

  return {
    chooseType,
    eventType,
  };
};

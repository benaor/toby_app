import { EventType } from "../models/EventForm.model";
import { AppDispatch, AppGetState } from "@store/store";
import { creationActions } from "../slices/creation.slice";

export const chooseTypeOfEvent =
  (type: EventType) => (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch(creationActions.chooseType(type));
  };

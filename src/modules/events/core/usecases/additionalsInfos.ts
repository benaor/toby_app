import { AppDispatch } from "@store/store";
import { creationActions } from "../slices/creation.slice";
import { EventFormAdditionalsInfos } from "../models/EventForm.model";

export const addAdditionalsInfos =
  (infos: EventFormAdditionalsInfos) => (dispatch: AppDispatch) => {
    dispatch(creationActions.setAdditionalsInfos(infos));
  };

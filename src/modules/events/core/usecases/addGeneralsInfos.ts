import { AppDispatch } from "@store/store";
import { EventFormGeneralsInfos } from "../models/EventForm.model";
import { creationActions } from "../slices/creation.slice";

export const addGeneralsInformations =
  (form: EventFormGeneralsInfos) => (dispatch: AppDispatch) => {
    dispatch(creationActions.setGeneralsInfos(form));
  };

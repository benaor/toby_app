import { Dependencies } from "@app/dependencies/Dependencies.type";
import { AppDispatch, AppGetState } from "@store/store";
import { eventsActions } from "../slices/event.slice";

export const fetchEventsList = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies,
) => {
  try {
    const myEvents = await dependencies.eventRepository.getAllMyEvent();
    dispatch(eventsActions.storeEventsList(myEvents));
  } catch {}
};

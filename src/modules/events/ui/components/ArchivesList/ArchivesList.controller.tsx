import { useSelector } from "react-redux";
import {
  archivesErrorSelector,
  archivesEntitiesSelector,
  archivesStatusSelector,
} from "@events/core/selectors/archives.selector";
import { useEffect } from "react";
import { useAppDispatch } from "@store/useAppDispatch";
import { fetchArchivedEventsList } from "@events/core/usecases/fetchArchivedEvents.usecase";

export const useArchivesList = () => {
  const dispatch = useAppDispatch();
  const archivedEvents = useSelector(archivesEntitiesSelector);
  const status = useSelector(archivesStatusSelector);
  const error = useSelector(archivesErrorSelector);

  useEffect(() => {
    if (archivedEvents.length > 0) return;

    dispatch(fetchArchivedEventsList());
  }, [archivedEvents.length, dispatch]);

  return {
    archivedEvents,
    isLoading: status === "loading",
    error,
  };
};

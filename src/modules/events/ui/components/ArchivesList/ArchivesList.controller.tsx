import { useSelector } from "react-redux";
import {
  allArchivesSelector,
  archivesStateSelector,
} from "@events/core/selectors/archives.selector";
import { useEffect } from "react";
import { useAppDispatch } from "@store/useAppDispatch";
import { fetchArchivedEventsList } from "@events/core/usecases/fetchArchivedEvents.usecase";

export const useArchivesList = () => {
  const dispatch = useAppDispatch();
  const archivedEvents = useSelector(allArchivesSelector);
  const { status, error } = useSelector(archivesStateSelector);

  useEffect(() => {
    if (archivedEvents.length > 0) return;
    const promise = dispatch(fetchArchivedEventsList());

    return () => promise.abort();
  }, [dispatch]);

  return {
    archivedEvents,
    isLoading: status === "loading",
    error,
  };
};

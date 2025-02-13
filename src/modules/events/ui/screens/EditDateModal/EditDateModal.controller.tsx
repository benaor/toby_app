import { useToggle } from "@/src/ui/hooks/useToggle";
import { useRouter } from "@app/router/useRouter";
import { eventByIdSelector } from "@events/core/selectors/events.selector";
import { ChangeDateOfEvent } from "@events/core/usecases/ChangeDateOfEvent";
import { useAppDispatch } from "@store/useAppDispatch";
import { isISO8601Before } from "@utils/dates/isISO8601Before";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const useEditDateModal = (eventId: Identifier) => {
  const { back } = useRouter();
  const dispatch = useAppDispatch();
  const event = useSelector(eventByIdSelector(eventId));

  const isReady = useMemo(() => !!event, [event]);

  const [startDate, setStartDate] = useState<ISO8601 | null>(
    event?.date.start ?? null,
  );

  const [endDate, setEndDate] = useState<ISO8601 | null>(
    event?.date.end ?? null,
  );

  const [endDateError, setEndDateError] = useState<string | null>(null);

  useEffect(() => {
    if (!endDate || !startDate) return;

    if (!isISO8601Before(startDate, endDate))
      setEndDateError("End date must be after start date");
    else setEndDateError(null);
  }, [endDate, startDate]);

  const [hasEndDate, toggleHasEndDate] = useToggle(!!event?.date.end, () => {
    setEndDate(null);
    setEndDateError(null);
  });

  const changeEventDate = useCallback(() => {
    if (!startDate) return;

    dispatch(
      ChangeDateOfEvent({
        eventId,
        startDate,
        endDate,
      }),
    ).then(back);
  }, [dispatch, back, eventId, startDate, endDate]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    changeEventDate,
    hasEndDate,
    toggleHasEndDate,
    endDateError,
    isReady,
  };
};

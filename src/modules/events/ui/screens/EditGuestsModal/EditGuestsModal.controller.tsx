import { useSelector } from "react-redux";
import { Guest } from "../../../core/models/Guest.model";
import { eventByIdSelector } from "@events/core/selectors/events.selector";
import { useMemo, useCallback } from "react";
import { useAppDispatch } from "@store/useAppDispatch";
import { removeGuestFromEvent } from "@events/core/usecases/removeGuestFromEvent";

export const useEditGuestsModal = (eventId: Identifier) => {
  const dispatch = useAppDispatch();
  const event = useSelector(eventByIdSelector(eventId));

  const guestsWhoAreAccepted: Guest[] =
    event?.guests.filter((guest) => guest.accepted === true) ?? [];

  const guestsWhoAreRefused: Guest[] =
    event?.guests.filter((guest) => guest.accepted === false) ?? [];

  const guestsWhoAreNotDecided: Guest[] =
    event?.guests.filter(
      (guest) => !guest.accepted && guest.accepted !== false,
    ) ?? [];

  const removeGuest = useCallback(
    (guestId: string) => {
      dispatch(removeGuestFromEvent({ eventId, guestId }));
    },
    [dispatch, eventId],
  );

  const isAdmin = useMemo(() => event?.isAdmin, [event]);
  const isReady = useMemo(() => !!event, [event]);

  return {
    guestsWhoAreAccepted,
    guestsWhoAreRefused,
    guestsWhoAreNotDecided,
    removeGuest,
    isAdmin,
    isReady,
  };
};

import { useRouter } from "@app/router/useRouter";
import { screens } from "@constants/screens";
import { eventByIdSelector } from "@events/core/selectors/events.selector";
import { acceptInvitation as acceptInvitationUseCase } from "@events/core/usecases/acceptInvitation";
import { declineInvitation as declineInvitationUseCase } from "@events/core/usecases/declineInvitation";
import { useAppDispatch } from "@store/useAppDispatch";

import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useEventSummaryScreen = (eventId: Identifier) => {
  const event = useSelector(eventByIdSelector(eventId));

  const dispatch = useAppDispatch();

  const acceptInvitation = () => {
    dispatch(acceptInvitationUseCase(eventId));
  };

  const refuseInvitation = () => {
    dispatch(declineInvitationUseCase(eventId));
  };

  const { push, navigate } = useRouter();

  const openEditLocationModal = useCallback(() => {
    push(screens.routesWithId.editLocations(eventId));
  }, [eventId, push]);

  const openEditGuestsModal = useCallback(() => {
    push(screens.routesWithId.editGuests(eventId));
  }, [eventId, push]);

  const openEditDatesModal = useCallback(() => {
    push(screens.routesWithId.editDates(eventId));
  }, [eventId, push]);

  const openEditImportantMsgModal = useCallback(() => {
    push(screens.routesWithId.editImportantMsg(eventId));
  }, [eventId, push]);

  const openEditNotesModal = useCallback(() => {
    push(screens.routesWithId.editNotes(eventId));
  }, [eventId, push]);

  const openEditPoolsModal = useCallback(() => {
    push(screens.routesWithId.editPools(eventId));
  }, [eventId, push]);

  const openAddBudgetModal = useCallback(() => {
    push(screens.routesWithId.addBudget(eventId));
  }, [eventId, push]);

  const goToCalendar = useCallback(() => {
    navigate(screens.routes.calendar);
  }, [navigate]);

  const goToEventSettings = useCallback(() => {
    navigate(screens.routesWithId.eventSettings(eventId));
  }, [navigate, eventId]);

  return {
    event,
    acceptInvitation,
    refuseInvitation,
    openEditLocationModal,
    openEditGuestsModal,
    openEditDatesModal,
    openEditImportantMsgModal,
    openEditNotesModal,
    openEditPoolsModal,
    openAddBudgetModal,
    goToCalendar,
    goToEventSettings,
  };
};

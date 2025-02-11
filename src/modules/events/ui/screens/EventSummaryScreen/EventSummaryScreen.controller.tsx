import { useRouter } from "@app/router/useRouter";
import { screens } from "@constants/screens";
import { eventsSelectors } from "@events/core/slices/event.slice";
import { acceptInvitation as acceptInvitationUseCase } from "@events/core/usecases/acceptInvitation";
import { declineInvitation as declineInvitationUseCase } from "@events/core/usecases/declineInvitation";
import { AppState } from "@store/store";
import { useAppDispatch } from "@store/useAppDispatch";

import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useEventSummaryScreen = (eventId: Identifier) => {
  const event = useSelector((state: AppState) =>
    eventsSelectors.selectById(state.events, eventId),
  )!; // If i'm here, the event must exists in the store

  const dispatch = useAppDispatch();

  const acceptInvitation = () => {
    dispatch(acceptInvitationUseCase(eventId));
  };

  const refuseInvitation = () => {
    dispatch(declineInvitationUseCase(eventId));
  };

  const { push, navigate } = useRouter();

  const openEditLocationModal = useCallback(() => {
    push(screens.routesWithId.editLocations(event.id));
  }, [event?.id, push]);

  const openEditGuestsModal = useCallback(() => {
    push(screens.routesWithId.editGuests(event.id));
  }, [event.id, push]);

  const openEditDatesModal = useCallback(() => {
    push(screens.routesWithId.editDates(event.id));
  }, [event.id, push]);

  const openEditImportantMsgModal = useCallback(() => {
    push(screens.routesWithId.editImportantMsg(event.id));
  }, [event.id, push]);

  const openEditNotesModal = useCallback(() => {
    push(screens.routesWithId.editNotes(event.id));
  }, [event.id, push]);

  const openEditPoolsModal = useCallback(() => {
    push(screens.routesWithId.editPools(event.id));
  }, [event.id, push]);

  const openAddBudgetModal = useCallback(() => {
    push(screens.routesWithId.addBudget(event.id));
  }, [event.id, push]);

  const goToCalendar = useCallback(() => {
    navigate(screens.routes.calendar);
  }, [navigate]);

  const goToEventSettings = useCallback(() => {
    navigate(screens.routesWithId.eventSettings(event.id));
  }, [navigate, event.id]);

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

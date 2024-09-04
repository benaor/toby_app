import { screens } from "@constants/screens";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useEventSummaryScreen = () => {
  const event = {
    id: "1",
    title: "Weekend Anniversaire",
    description: `C’est l’anniversaire de Marco ! Notez bien la date dans vos agendas, ça va être une sacrée soirée, je compte sur vous ! \n\n Toutes les infos sur l’organisation 👇👇 `,
    dates: {
      start: new Date("2025-03-01"),
      end: new Date("2025-03-03"),
    },
    image: "https://picsum.photos/200/300",
    guests: [],
    notification: {
      count: 0,
    },
    isAdmin: false,
    invitationAccepted: true,
    address: {
      city: "Paris",
    },
    pool: {
      title: "cadeau d'anniversaire",
      amount: 0,
      participants: 0,
      hasParticipated: true,
    },
  };

  const survey = {
    title: "Vote pour la date !",
    isPending: true,
    guests: [
      {
        id: 1,
        avatar: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        avatar: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        avatar: "https://picsum.photos/200/300",
      },
      {
        id: 4,
        avatar: "https://picsum.photos/200/300",
      },
    ],
  };

  const acceptInvitation = () => {};

  const refuseInvitation = () => {};

  const { push, navigate } = useRouter();

  const openEditLocationModal = useCallback(() => {
    push(screens.editLocations(event.id));
  }, [event.id, push]);

  const openEditGuestsModal = useCallback(() => {
    push(screens.editGuests(event.id));
  }, [event.id, push]);

  const openEditDatesModal = useCallback(() => {
    push(screens.editDates(event.id));
  }, [event.id, push]);

  const openEditImportantMsgModal = useCallback(() => {
    push(screens.editImportantMsg(event.id));
  }, [event.id, push]);

  const openEditNotesModal = useCallback(() => {
    push(screens.editNotes(event.id));
  }, [event.id, push]);

  const openEditPoolsModal = useCallback(() => {
    push(screens.editPools(event.id));
  }, [event.id, push]);

  const openAddBudgetModal = useCallback(() => {
    push(screens.addBudget(event.id));
  }, [event.id, push]);

  const goToCalendar = useCallback(() => {
    navigate(screens.calendar);
  }, [navigate]);

  return {
    event,
    survey,
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
  };
};

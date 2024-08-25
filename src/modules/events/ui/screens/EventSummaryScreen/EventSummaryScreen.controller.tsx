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
  };

  const acceptInvitation = () => {};

  const refuseInvitation = () => {};

  return {
    event,
    acceptInvitation,
    refuseInvitation,
  };
};

export const useEventSummaryScreen = () => {
  const event = {
    id: "1",
    title: "Event Title",
    description: "Event Description",
    date: new Date(),
    image: "https://picsum.photos/200/300",
    guests: [],
    notification: {
      count: 0,
    },
    isAdmin: false,
  };

  return {
    event,
  };
};

import { useCallback, useState } from "react";

export const useAddGuestsToEventModal = () => {
  const [guests, setGuests] = useState([
    {
      id: "1",
      name: "Julie",
      image: "https://picsum.photos/200/300",
    },
    {
      id: "2",
      name: "Julien",
      image: "https://picsum.photos/200/300",
    },
    {
      id: "3",
      name: "Charles",
      image: "https://picsum.photos/200/300",
    },
    {
      id: "4",
      name: "Grégoire",
      image: "https://picsum.photos/200/300",
    },
  ]);

  const [guestsProposition, setGuestsProposition] = useState([
    {
      id: "5",
      name: "Etienne",
      image: "https://picsum.photos/200/300",
    },
    {
      id: "6",
      name: "François",
      image: "https://picsum.photos/200/300",
    },
  ]);

  const removeGuest = useCallback(
    (id: Identifier) => {
      setGuests(guests.filter((guest) => guest.id !== id));
    },
    [guests],
  );

  const addGuest = useCallback(
    (id: Identifier) => {
      const guest = guestsProposition.find((guest) => guest.id === id);

      if (!guest) return;
      setGuests([...guests, guest]);
      setGuestsProposition(
        guestsProposition.filter((guest) => guest.id !== id),
      );
    },
    [guests, guestsProposition],
  );

  return {
    guests,
    guestsProposition,
    removeGuest,
    addGuest,
  };
};

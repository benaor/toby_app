import { Guest } from "../../../core/models/Guest.model";

export const useEditGuestsModal = () => {
  const guestsWhoAreAccepted: Guest[] = [
    {
      id: "1",
      name: "John",
      email: "john@mail.com",
      accepted: true,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "2",
      name: "Thomas",
      email: "",
      accepted: true,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "3",
      name: "Jane",
      email: "",
      accepted: true,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "4",
      name: "Rosaline",
      email: "",
      accepted: true,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "5",
      name: "Brigitte",
      email: "",
      accepted: true,
      image: "https://picsum.photos/200/300",
    },
  ];

  const guestsWhoAreRefused: Guest[] = [
    {
      id: "90",
      name: "John",
      email: "john@mail.com",
      accepted: false,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "91",
      name: "Thomas",
      email: "",
      accepted: false,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "92",
      name: "Jane",
      email: "",
      accepted: false,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "93",
      name: "Rosaline",
      email: "",
      accepted: false,
      image: "https://picsum.photos/200/300",
    },
    {
      id: "94",
      name: "Brigitte",
      email: "",
      accepted: false,
      image: "https://picsum.photos/200/300",
    },
  ];

  const removeGuest = (id: string) => {};

  return {
    guestsWhoAreAccepted,
    guestsWhoAreRefused,
    removeGuest,
  };
};

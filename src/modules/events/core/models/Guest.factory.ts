import { Guest } from "./Guest.model";

export class GuestFactory {
  static GUEST(guest: Partial<Guest>): Guest {
    return {
      id: "guest-id-1",
      name: "Benjamin",
      image: "http://guest.factory.image/",
      email: "guest@factory.test",
      accepted: null,
      ...guest,
    };
  }
}

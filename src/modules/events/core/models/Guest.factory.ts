import { Guest } from "./Guest.model";

export class GuestFactory {
  static GUEST(guest: Partial<Guest>): Guest {
    return {
      id: "guest-id-1",
      name: "Benjamin",
      image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 80)}.jpg`,
      email: "guest@factory.test",
      accepted: null,
      ...guest,
    };
  }
}

import { GuestFactory } from "../models/Guest.factory";
import { GuestsRepository } from "../ports/GuestsRepository";

export class InMemoryGuestsRepository implements GuestsRepository {
  private guests = [
    GuestFactory.GUEST({ id: "1", name: "John Doe" }),
    GuestFactory.GUEST({ id: "2", name: "Jane Doe" }),
    GuestFactory.GUEST({ id: "3", name: "Alice" }),
    GuestFactory.GUEST({ id: "4", name: "Bob" }),
    GuestFactory.GUEST({ id: "5", name: "Charlie" }),
    GuestFactory.GUEST({ id: "6", name: "David" }),
    GuestFactory.GUEST({ id: "7", name: "Eve" }),
    GuestFactory.GUEST({ id: "8", name: "Frank" }),
    GuestFactory.GUEST({ id: "9", name: "Grace" }),
    GuestFactory.GUEST({ id: "10", name: "Hannah" }),
    GuestFactory.GUEST({ id: "10", name: "Christophe" }),
    GuestFactory.GUEST({ id: "11", name: "Isaac" }),
    GuestFactory.GUEST({ id: "12", name: "Jack" }),
    GuestFactory.GUEST({ id: "13", name: "Karen" }),
    GuestFactory.GUEST({ id: "14", name: "Leo" }),
    GuestFactory.GUEST({ id: "15", name: "Mona" }),
    GuestFactory.GUEST({ id: "16", name: "Nina" }),
    GuestFactory.GUEST({ id: "17", name: "Oscar" }),
    GuestFactory.GUEST({ id: "18", name: "Paul" }),
    GuestFactory.GUEST({ id: "19", name: "Quincy" }),
    GuestFactory.GUEST({ id: "20", name: "Rachel" }),
    GuestFactory.GUEST({ id: "21", name: "Steve" }),
    GuestFactory.GUEST({ id: "22", name: "Tracy" }),
    GuestFactory.GUEST({ id: "23", name: "Uma" }),
    GuestFactory.GUEST({ id: "24", name: "Victor" }),
    GuestFactory.GUEST({ id: "25", name: "Wendy" }),
    GuestFactory.GUEST({ id: "26", name: "Xander" }),
    GuestFactory.GUEST({ id: "27", name: "Yara" }),
    GuestFactory.GUEST({ id: "28", name: "Zane" }),
    GuestFactory.GUEST({ id: "29", name: "Aaron" }),
    GuestFactory.GUEST({ id: "30", name: "Bella" }),
  ];

  async searchMany(field: string) {
    const filteredGuests = this.guests.filter((guest) => {
      return guest.name.toLowerCase().includes(field.toLowerCase());
    });

    return Promise.resolve(filteredGuests);
  }
}

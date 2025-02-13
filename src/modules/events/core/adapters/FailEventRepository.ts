import { EventRepository } from "../ports/EventRepository";

export class FailEventRepository implements EventRepository {
  constructor(private readonly message?: string) {}

  getAllMyEvents = async () => {
    throw new Error(this.message);
  };

  getAllArchivedEvents = async () => {
    throw new Error(this.message);
  };

  createEvent = async () => {
    throw new Error(this.message);
  };

  acceptInvitation = jest.fn().mockRejectedValue(null);

  declineInvitation = jest.fn().mockRejectedValue(null);

  removeGuestFromEvent = jest.fn().mockRejectedValue(null);

  changeDateOfEvent = jest.fn().mockRejectedValue(null);
}

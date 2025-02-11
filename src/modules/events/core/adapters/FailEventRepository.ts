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

  acceptInvitation = jest.fn().mockRejectedValue(() => new Error(this.message));

  declineInvitation = jest
    .fn()
    .mockRejectedValue(() => new Error(this.message));

  removeGuestFromEvent = jest
    .fn()
    .mockRejectedValue(() => new Error(this.message));
}

import { EventList } from "../models/Event.model";
import { EventRepository } from "../ports/EventRepository";

export class FailEventRepository implements EventRepository {
  constructor(private readonly message?: string) {}

  getAllMyEvents: () => Promise<EventList> = async () => {
    throw new Error(this.message);
  };
}

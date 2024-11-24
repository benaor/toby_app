import { EventFactory } from "../models/Event.factory";
import { UserEvent, EventList } from "../models/Event.model";
import { EventForm } from "../models/EventForm.model";
import { EventRepository } from "../ports/EventRepository";

export class StubEventRepository implements EventRepository {
  constructor(private events: EventList = []) {}

  getAllMyEvents: () => Promise<EventList> = async () => {
    return Promise.resolve(this.events);
  };

  getAllArchivedEvents: () => Promise<EventList> = async () => {
    return Promise.resolve(this.events);
  };

  createEvent: (form: EventForm) => Promise<UserEvent> = jest
    .fn()
    .mockImplementation((form) =>
      Promise.resolve(
        EventFactory.USER_EVENT({
          ...form,
          id: "1",
        }),
      ),
    );
}

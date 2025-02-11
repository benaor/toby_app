import { EventFactory } from "../models/Event.factory";
import { UserEvent, EventList } from "../models/Event.model";
import { EventForm } from "../models/EventForm.model";
import { EventRepository } from "../ports/EventRepository";

export class StubEventRepository implements EventRepository {
  private _userEvent: UserEvent = EventFactory.USER_EVENT();
  private _events: EventList = [];

  setupEvent = (userEvent?: Partial<UserEvent>) => {
    this._userEvent = EventFactory.USER_EVENT(userEvent);
  };

  setupEventsList = (events: EventList) => {
    this._events = events;
  };

  getAllMyEvents: () => Promise<EventList> = async () => {
    return Promise.resolve(this._events);
  };

  getAllArchivedEvents: () => Promise<EventList> = async () => {
    return Promise.resolve(this._events);
  };

  createEvent: (form: EventForm) => Promise<UserEvent> = jest
    .fn()
    .mockImplementation((form) =>
      Promise.resolve({
        ...this._userEvent,
        ...form,
      }),
    );

  acceptInvitation: (eventId: Identifier) => Promise<void> = jest.fn();

  declineInvitation: (eventId: Identifier) => Promise<void> = jest.fn();
}

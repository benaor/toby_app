import { EventFactory } from "../models/Event.factory";
import { ArchivedEventList, EventList, Event } from "../models/Event.model";
import { EventCreationForm } from "../models/EventForm.model";
import { GuestFactory } from "../models/Guest.factory";
import { EventRepository } from "../ports/EventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: EventList = [
    EventFactory.USER_EVENT({
      id: "1",
      title: "Anniv. Benjamin",
      date: {
        start: "2021-12-24",
        end: "2021-12-24",
      },
      guests: [
        GuestFactory.GUEST({ id: "1", accepted: true }),
        GuestFactory.GUEST({ id: "2" }),
        GuestFactory.GUEST({ id: "3", accepted: false }),
      ],
      isAdmin: true,
    }),
    EventFactory.USER_EVENT({
      id: "3",
      title: "Team building",
      date: {
        start: "2021-09-01",
        end: "2021-09-02",
      },
    }),
    EventFactory.USER_EVENT({
      id: "4",
      title: "Fête de Thomas",
      date: {
        start: "2021-08-03",
        end: null,
      },
    }),
    EventFactory.USER_EVENT({
      id: "5",
      title: "Vacances Suisse",
      date: {
        start: "2021-08-03",
        end: "2021-08-12",
      },
    }),
    EventFactory.USER_EVENT({
      id: "2",
      title: "Soirée de l'été",
      date: {
        start: "2021-07-01",
        end: null,
      },
    }),
  ];

  private archivedEvents: ArchivedEventList = [
    EventFactory.USER_EVENT({
      id: "60",
      title: "Nouvel an",
      date: {
        start: "2020-01-01",
        end: null,
      },
    }),
    EventFactory.USER_EVENT({
      id: "70",
      title: "Caca chez Paul",
      date: {
        start: "2020-07-01",
        end: null,
      },
    }),
    EventFactory.USER_EVENT({
      id: "80",
      title: "Team building",
      date: {
        start: "2020-09-01",
        end: "2020-09-02",
      },
    }),
  ];

  getAllMyEvents = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve(this.events);
  };

  getAllArchivedEvents = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve(this.archivedEvents);
  };

  createEvent: (form: EventCreationForm) => Promise<Event> = (form) => {
    const newEvent: Event = {
      ...form,
      id: Math.floor(Math.random() * 100).toString(),
    };

    this.events.push({
      ...newEvent,
      notification: { count: 0 },
      invitationAccepted: true,
      isAdmin: true,
    });

    return Promise.resolve(newEvent);
  };

  acceptInvitation = async (eventId: Identifier) => {
    const event = this.events.find((event) => event.id === eventId);
    if (event) {
      event.invitationAccepted = true;
    }
  };

  declineInvitation = async (eventId: Identifier) => {
    const event = this.events.find((event) => event.id === eventId);
    if (event) {
      event.invitationAccepted = false;
    }
  };

  removeGuestFromEvent = async (eventId: Identifier, guestId: Identifier) => {
    const event = this.events.find((event) => event.id === eventId);
    if (event) {
      event.guests = event.guests.filter((guest) => guest.id !== guestId);
    }
  };
}

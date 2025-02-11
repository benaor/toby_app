import { declineInvitation } from "../declineInvitation";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";
import { createTestStore } from "@store/test-environment";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";

describe("declineInvitation", () => {
  const eventRepository = new StubEventRepository();
  const myBirthday = EventFactory.USER_EVENT({
    id: "birthday-id",
    title: "my birthday",
    isAdmin: false,
    invitationAccepted: undefined,
  });

  it("should decline invitation and perform optimistic update", async () => {
    const store = createTestStore({
      dependencies: { eventRepository },
      initialState: {
        events: {
          ids: [myBirthday.id],
          entities: {
            [myBirthday.id]: myBirthday,
          },
          status: "idle",
          error: null,
        },
      },
    });

    const promise = store.dispatch(declineInvitation(myBirthday.id));

    let event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(false);

    await promise;

    event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(false);

    expect(eventRepository.declineInvitation).toHaveBeenCalledWith(
      myBirthday.id,
    );
  });

  it("should decline invitation and perform optimistic update but revert it if the request fails", async () => {
    const eventRepository = new FailEventRepository(
      "fail while declining invitation",
    );

    const store = createTestStore({
      initialState: {
        events: {
          ids: [myBirthday.id],
          entities: {
            [myBirthday.id]: { ...myBirthday, invitationAccepted: true },
          },
          status: "idle",
          error: null,
        },
      },
      dependencies: { eventRepository },
    });

    const promise = store.dispatch(declineInvitation(myBirthday.id));

    let event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(false);

    await promise;

    event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(true);

    expect(eventRepository.declineInvitation).toHaveBeenCalledWith(
      myBirthday.id,
    );
  });

  it("should not decline invitation if already declined", async () => {
    const eventRepository = new StubEventRepository();

    const store = createTestStore({
      initialState: {
        events: {
          ids: [myBirthday.id],
          entities: {
            [myBirthday.id]: {
              ...myBirthday,
              invitationAccepted: false,
            },
          },
          status: "idle",
          error: null,
        },
      },
      dependencies: { eventRepository },
    });

    await store.dispatch(declineInvitation(myBirthday.id));

    const event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(false);

    expect(eventRepository.declineInvitation).not.toHaveBeenCalled();
  });
});

import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";
import { createTestStore } from "@store/test-environment";
import { acceptInvitation } from "../acceptInvitation";
import { FailEventRepository } from "@events/core/adapters/FailEventRepository";

describe("acceptInvitation", () => {
  const eventRepository = new StubEventRepository();
  const myBirthday = EventFactory.USER_EVENT({
    id: "birtday-id",
    title: "my birtday",
    isAdmin: false,
    invitationAccepted: undefined,
  });

  it("should accept invitation and perform optimistic update", async () => {
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

    const promise = store.dispatch(acceptInvitation(myBirthday.id));

    let event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(true);

    await promise;

    event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(true);

    expect(eventRepository.acceptInvitation).toHaveBeenCalledWith(
      myBirthday.id,
    );
  });

  it("should accept invitation and perform optimistic update but revert it if the request fails", async () => {
    const eventRepository = new FailEventRepository(
      "fail while accepting invitation",
    );

    const store = createTestStore({
      initialState: {
        events: {
          ids: [myBirthday.id],
          entities: {
            [myBirthday.id]: { ...myBirthday, invitationAccepted: false },
          },
          status: "idle",
          error: null,
        },
      },
      dependencies: { eventRepository },
    });

    const promise = store.dispatch(acceptInvitation(myBirthday.id));

    let event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(true);

    await promise;

    event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(false);

    expect(eventRepository.acceptInvitation).toHaveBeenCalledWith(
      myBirthday.id,
    );
  });

  it("should not accept invitation if it is already accepted", async () => {
    const eventRepository = new StubEventRepository();

    const store = createTestStore({
      initialState: {
        events: {
          ids: [myBirthday.id],
          entities: {
            [myBirthday.id]: {
              ...myBirthday,
              invitationAccepted: true,
            },
          },
          status: "idle",
          error: null,
        },
      },
      dependencies: { eventRepository },
    });

    await store.dispatch(acceptInvitation(myBirthday.id));

    const event = store.getState().events.entities[myBirthday.id];
    expect(event?.invitationAccepted).toBe(true);

    expect(eventRepository.acceptInvitation).not.toHaveBeenCalled();
  });
});

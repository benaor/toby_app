import { renderHook } from "@app/react/renderHook";
import { EventFactory } from "@events/core/models/Event.factory";
import { GuestFactory } from "@events/core/models/Guest.factory";
import { eventsInitialState } from "@events/core/slices/event.slice";
import { createTestStore } from "@store/test-environment";
import { produce } from "immer";
import { useEditGuestsModal } from "./EditGuestsModal.controller";
import { act } from "@testing-library/react-native";

describe("EditGuestsModal", () => {
  describe("Lists of guests", () => {
    it("should return empty lists if event is not loaded yet", () => {
      const { result } = renderHook(useEditGuestsModal, {
        initialProps: "non-existing-event-id",
      });

      const {
        guestsWhoAreAccepted,
        guestsWhoAreRefused,
        guestsWhoAreNotDecided,
      } = result.current;

      expect(guestsWhoAreAccepted).toStrictEqual([]);
      expect(guestsWhoAreRefused).toStrictEqual([]);
      expect(guestsWhoAreNotDecided).toStrictEqual([]);
    });

    describe("lists of guests who have accepted", () => {
      it("should return an empty list as guests who are accepted", () => {
        const event = EventFactory.USER_EVENT({
          id: "event-id",
          title: "event-title",
          isAdmin: true,
          guests: [],
        });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreAccepted = result.current.guestsWhoAreAccepted;

        expect(guestsWhoAreAccepted).toStrictEqual([]);
      });

      it("should return every guests if everyone has accepted", () => {
        const guests = [
          GuestFactory.GUEST({ id: "1", accepted: true }),
          GuestFactory.GUEST({ id: "2", accepted: true }),
        ];

        const event = EventFactory.USER_EVENT({ guests });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreAccepted = result.current.guestsWhoAreAccepted;

        expect(guestsWhoAreAccepted).toStrictEqual(guests);
      });

      it("should return only the guests who have accepted", () => {
        const acceptedGuest = GuestFactory.GUEST({ id: "1", accepted: true });
        const refusedGuest = GuestFactory.GUEST({ id: "2", accepted: false });
        const waitingGuest = GuestFactory.GUEST({
          id: "3",
          accepted: undefined,
        });

        const guests = [acceptedGuest, refusedGuest, waitingGuest];

        const event = EventFactory.USER_EVENT({ guests });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreAccepted = result.current.guestsWhoAreAccepted;

        expect(guestsWhoAreAccepted).toStrictEqual([acceptedGuest]);
      });
    });

    describe("lists of guests who have refused", () => {
      it("should return an empty list as guests who are refused", () => {
        const event = EventFactory.USER_EVENT({ guests: [] });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreRefused = result.current.guestsWhoAreRefused;

        expect(guestsWhoAreRefused).toStrictEqual([]);
      });

      it("should return every guests if everyone has refused", () => {
        const guests = [
          GuestFactory.GUEST({ id: "1", accepted: false }),
          GuestFactory.GUEST({ id: "2", accepted: false }),
        ];

        const event = EventFactory.USER_EVENT({ guests });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreRefused = result.current.guestsWhoAreRefused;

        expect(guestsWhoAreRefused).toStrictEqual(guests);
      });

      it("should return only the guests who have refused", () => {
        const refusedGuest = GuestFactory.GUEST({ id: "1", accepted: false });
        const acceptedGuest = GuestFactory.GUEST({ id: "2", accepted: true });
        const waitingGuest = GuestFactory.GUEST({
          id: "3",
          accepted: undefined,
        });

        const guests = [refusedGuest, acceptedGuest, waitingGuest];

        const event = EventFactory.USER_EVENT({ guests });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreRefused = result.current.guestsWhoAreRefused;

        expect(guestsWhoAreRefused).toStrictEqual([refusedGuest]);
      });
    });

    describe("lists of guests who have not decided", () => {
      it("should return an empty list as guests who are not decided", () => {
        const event = EventFactory.USER_EVENT({ guests: [] });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreNotDecided = result.current.guestsWhoAreNotDecided;

        expect(guestsWhoAreNotDecided).toStrictEqual([]);
      });

      it("should return the guests who have not decided", () => {
        const waitingGuest = GuestFactory.GUEST({
          id: "1",
          accepted: undefined,
        });
        const event = EventFactory.USER_EVENT({ guests: [waitingGuest] });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreNotDecided = result.current.guestsWhoAreNotDecided;

        expect(guestsWhoAreNotDecided).toStrictEqual([waitingGuest]);
      });

      it("should return the guests who have not decided", () => {
        const waitingGuest = GuestFactory.GUEST({
          id: "1",
          accepted: undefined,
        });
        const acceptedGuest = GuestFactory.GUEST({ id: "2", accepted: true });
        const refusedGuest = GuestFactory.GUEST({ id: "3", accepted: false });

        const event = EventFactory.USER_EVENT({
          guests: [waitingGuest, acceptedGuest, refusedGuest],
        });

        const store = createTestStore({
          initialState: {
            events: produce(eventsInitialState, (draft) => {
              draft.ids.push(event.id);
              draft.entities[event.id] = event;
            }),
          },
        });

        const { result } = renderHook(useEditGuestsModal, {
          initialProps: event.id,
          store,
        });

        const guestsWhoAreNotDecided = result.current.guestsWhoAreNotDecided;

        expect(guestsWhoAreNotDecided).toStrictEqual([waitingGuest]);
      });
    });
  });

  describe("isAdmin", () => {
    it("should return true if the event is admin", () => {
      const event = EventFactory.USER_EVENT({ isAdmin: true });

      const store = createTestStore({
        initialState: {
          events: produce(eventsInitialState, (draft) => {
            draft.ids.push(event.id);
            draft.entities[event.id] = event;
          }),
        },
      });

      const { result } = renderHook(useEditGuestsModal, {
        initialProps: event.id,
        store,
      });

      expect(result.current.isAdmin).toBe(true);
    });

    it("should return false if the event is not admin", () => {
      const event = EventFactory.USER_EVENT({ isAdmin: false });

      const store = createTestStore({
        initialState: {
          events: produce(eventsInitialState, (draft) => {
            draft.ids.push(event.id);
            draft.entities[event.id] = event;
          }),
        },
      });

      const { result } = renderHook(useEditGuestsModal, {
        initialProps: event.id,
        store,
      });

      expect(result.current.isAdmin).toBe(false);
    });
  });

  describe("removeGuest", () => {
    it("should remove a guest from the event", () => {
      const guestOne = GuestFactory.GUEST({ id: "1", accepted: undefined });
      const guestTwo = GuestFactory.GUEST({ id: "2", accepted: undefined });

      const guests = [guestOne, guestTwo];

      const event = EventFactory.USER_EVENT({ guests, isAdmin: true });

      const store = createTestStore({
        initialState: {
          events: produce(eventsInitialState, (draft) => {
            draft.ids.push(event.id);
            draft.entities[event.id] = event;
          }),
        },
      });

      const { result } = renderHook(useEditGuestsModal, {
        initialProps: event.id,
        store,
      });

      act(() => {
        result.current.removeGuest(guestOne.id);
      });

      expect(result.current.guestsWhoAreNotDecided).toStrictEqual([guestTwo]);
    });
  });
});

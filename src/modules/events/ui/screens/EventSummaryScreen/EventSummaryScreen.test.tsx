import { renderHook } from "@app/react/renderHook";
import { useEventSummaryScreen } from "./EventSummaryScreen.controller";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { EventFactory } from "@events/core/models/Event.factory";
import { createTestStore } from "@store/test-environment";
import { StubRouter } from "@app/router/StubRouter";
import { screens } from "@constants/screens";
import { Router } from "@app/router/Router.port";
import { AppStore } from "@store/store";

describe("useEventSummaryScreen", () => {
  let router: Router;
  let store: AppStore;

  const myBirthday = EventFactory.USER_EVENT({
    id: "birtday-id",
    title: "my birtday",
  });

  const musicParty = EventFactory.USER_EVENT({
    id: "music-id",
    title: "music party",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    router = new StubRouter();

    store = createTestStore({
      initialState: {
        events: {
          ids: [myBirthday.id, musicParty.id],
          entities: {
            [myBirthday.id]: myBirthday,
            [musicParty.id]: musicParty,
          },
          status: "idle",
          error: null,
        },
      },
    });
  });

  describe("Read only", () => {
    const eventRepository = new StubEventRepository();
    eventRepository.setupEventsList([myBirthday, musicParty]);

    it("should return event object", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository },
        store,
      });

      expect(result.current.event).toEqual(musicParty);
    });

    it("should redirect to calendar screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.goToCalendar();

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(screens.routes.calendar);
    });

    it("should redirect to event settings screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.goToEventSettings();

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(
        screens.routesWithId.eventSettings(musicParty.id),
      );
    });

    it("should redirect to edit notes screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditNotesModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editNotes(musicParty.id),
      );
    });

    it("should redirect to edit pools screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditPoolsModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editPools(musicParty.id),
      );
    });

    it("should redirect to add budget screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openAddBudgetModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.addBudget(musicParty.id),
      );
    });

    it("should redirect to edit important message screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditImportantMsgModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editImportantMsg(musicParty.id),
      );
    });

    it("should redirect to edit guests screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditGuestsModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editGuests(musicParty.id),
      );
    });

    it("should redirect to edit dates screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditDatesModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editDates(musicParty.id),
      );
    });

    it("should redirect to edit location screen", () => {
      const { result } = renderHook(useEventSummaryScreen, {
        initialProps: musicParty.id,
        dependencies: { eventRepository, router },
        store,
      });

      result.current.openEditLocationModal();

      expect(router.push).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith(
        screens.routesWithId.editLocations(musicParty.id),
      );
    });
  });
});

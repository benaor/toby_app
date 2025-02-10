import { renderHook } from "@app/react/renderHook";
import { useAddEventModulesModal } from "./AddEventModulesModal.controller";
import { act } from "@testing-library/react-native";
import { StubRouter } from "@app/router/StubRouter";
import { screens } from "@constants/screens";
import { StubEventRepository } from "@events/core/adapters/StubEventRepository";
import { initialCreationState } from "@events/core/slices/creation.slice";
import { produce } from "immer";
import { createTestStore } from "@store/test-environment";

// for spying
import * as createEventUsecase from "@events/core/usecases/createEvent.usecase";
import * as goBackToPreviousStepUsecase from "@events/core/usecases/goBackToPreviousStep";

describe("AddEventModulesModal", () => {
  describe("modules should be disabled when hook is mounted for the first time", () => {
    it("location module should be disabled", () => {
      const { result } = renderHook(useAddEventModulesModal);
      const locationModule = result.current.location;
      expect(locationModule).toBe(false);
    });

    it("budget module should be disabled", () => {
      const { result } = renderHook(useAddEventModulesModal);
      const budgetModule = result.current.budget;
      expect(budgetModule).toBe(false);
    });

    it("activity module should be disabled", () => {
      const { result } = renderHook(useAddEventModulesModal);
      const activityModule = result.current.activity;
      expect(activityModule).toBe(false);
    });

    it("cagnotte module should be disabled", () => {
      const { result } = renderHook(useAddEventModulesModal);
      const cagnotteModule = result.current.cagnotte;
      expect(cagnotteModule).toBe(false);
    });
  });

  describe("Should enable module", () => {
    it("should enable location module", async () => {
      const { result } = renderHook(useAddEventModulesModal);

      act(() => {
        result.current.toggleLocation();
      });

      const locationModule = result.current.location;
      expect(locationModule).toBe(true);
    });

    it("should enable budget module", async () => {
      const { result } = renderHook(useAddEventModulesModal);

      act(() => {
        result.current.toggleBudget();
      });

      const budgetModule = result.current.budget;
      expect(budgetModule).toBe(true);
    });

    it("should enable activity module", async () => {
      const { result } = renderHook(useAddEventModulesModal);

      act(() => {
        result.current.toggleActivity();
      });

      const activityModule = result.current.activity;
      expect(activityModule).toBe(true);
    });

    it("should enable cagnotte module", async () => {
      const { result } = renderHook(useAddEventModulesModal);

      act(() => {
        result.current.toggleCagnotte();
      });

      const cagnotteModule = result.current.cagnotte;
      expect(cagnotteModule).toBe(true);
    });
  });

  describe("Should create event", () => {
    it("should create event", async () => {
      const eventId = "test-123";
      const router = new StubRouter();
      const eventRepository = new StubEventRepository();
      eventRepository.setupEvent({ id: eventId });

      const store = createTestStore({
        initialState: {
          creation: produce(initialCreationState, (draft) => {
            draft.form.type = "holidays";
            draft.form.title = "test";
            draft.form.description = "test";
            draft.form.image = "test";
            draft.form.date.start = "2025-01-01";
            draft.form.date.end = "2025-01-01";
            draft.form.location = {
              address: "My address",
              name: "My location",
            };
            draft.form.guests = [];
          }),
        },
        dependencies: {
          eventRepository,
        },
      });

      const { result } = renderHook(useAddEventModulesModal, {
        store,
        dependencies: { router, eventRepository },
      });

      const spyCreateEvent = jest.spyOn(createEventUsecase, "createEvent");

      await act(async () => {
        await result.current.createEvent();
      });

      expect(spyCreateEvent).toHaveBeenCalled();

      expect(router.back).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(
        screens.routesWithId.eventSummary(eventId),
      );
    });

    it("should go back to the previous step", async () => {
      const spyGoBackToPreviousStep = jest.spyOn(
        goBackToPreviousStepUsecase,
        "goBackToPreviousStep",
      );

      const { result } = renderHook(useAddEventModulesModal);

      act(() => {
        result.current.backPreviousStep();
      });

      expect(spyGoBackToPreviousStep).toHaveBeenCalled();
    });
  });
});

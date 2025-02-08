import { renderHook } from "@app/react/renderHook";
import { useAddEventModulesModal } from "./AddEventModulesModal.controller";
import { act } from "@testing-library/react-native";

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
});

import { renderHook } from "@app/react/renderHook";
import { useEventAdditionalInfosModal } from "./EventAdditionalInfosModal.controller";
import { act } from "@testing-library/react-native";
import { StubRouter } from "@app/router/StubRouter";

describe("EventAdditionalInfosModal", () => {
  it("Should return empty state from controller", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    expect(result.current.locationName).toBe("");
    expect(result.current.address).toBe("");
    expect(result.current.hasEndDate).toBe(false);
  });

  it("Should edit form values", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    act(() => {
      result.current.setLocationName("Location");
      result.current.setAddress("Address");
    });

    expect(result.current.locationName).toBe("Location");
    expect(result.current.address).toBe("Address");
  });

  it("Should toggle hasEndDate", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    expect(result.current.hasEndDate).toBe(false);

    act(() => {
      result.current.toggleHasEndDate();
    });

    expect(result.current.hasEndDate).toBe(true);

    act(() => {
      result.current.toggleHasEndDate();
    });

    expect(result.current.hasEndDate).toBe(false);
  });

  it("Should edit dates", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    act(() => {
      result.current.setStartDate("2022-01-01T00:00:00Z");
      result.current.setEndDate("2022-01-02T00:00:00Z");
    });

    expect(result.current.startDate).toBe("2022-01-01T00:00:00Z");
    expect(result.current.endDate).toBe("2022-01-02T00:00:00Z");
  });

  it("should close modal", () => {
    const router = new StubRouter();

    const { result } = renderHook(useEventAdditionalInfosModal, {
      dependencies: { router },
    });

    act(() => {
      result.current.closeModal();
    });

    expect(router.dismiss).toHaveBeenCalled();
  });
});

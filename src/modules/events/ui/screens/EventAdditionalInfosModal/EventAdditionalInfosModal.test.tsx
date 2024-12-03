import { renderHook } from "@app/react/renderHook";
import { useEventAdditionalInfosModal } from "./EventAdditionalInfosModal.controller";
import { act } from "@testing-library/react-native";

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
});

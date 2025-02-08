import { renderHook, act } from "@testing-library/react-native";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should initialize with default value (false)", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("should initialize with provided value (true)", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it("should toggle the state from false to true", () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it("should toggle the state from true to false", () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it("should toggle the state multiple times", () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it("should call the callback with the new state after toggle", () => {
    const onToggle = jest.fn();
    const { result } = renderHook(() => useToggle(false, onToggle));

    act(() => {
      result.current[1]();
    });
    expect(onToggle).toHaveBeenCalledWith(true);

    act(() => {
      result.current[1]();
    });
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(onToggle).toHaveBeenCalledTimes(2);
  });
});

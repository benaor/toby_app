import { renderHook } from "@app/react/renderHook";
import { EventFactory } from "@events/core/models/Event.factory";
import { useEditDateModal } from "./EditDateModal.controller";
import { createTestStore } from "@store/test-environment";
import { eventsInitialState } from "@events/core/slices/event.slice";
import { produce } from "immer";

//Spies
import * as ChangeDateOfEventUseCase from "@events/core/usecases/ChangeDateOfEvent";
import { act } from "@testing-library/react-native";

describe("EditDateModal", () => {
  it("should not be ready if the event is still loading", () => {
    const { result } = renderHook(useEditDateModal, {
      initialProps: "non-existing-event-id",
    });

    expect(result.current.isReady).toBe(false);
  });

  it("should be ready if the event is loaded", () => {
    const event = EventFactory.USER_EVENT();

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const { result } = renderHook(useEditDateModal, {
      initialProps: event.id,
      store,
    });

    expect(result.current.isReady).toBe(true);
  });

  it("should be ready if the event is loaded", () => {
    const event = EventFactory.USER_EVENT({
      date: {
        start: new Date("2025-01-01").toISOString(),
        end: null,
      },
    });

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const { result } = renderHook(useEditDateModal, {
      initialProps: event.id,
      store,
    });

    expect(result.current.isReady).toBe(true);
  });

  it("When disabling the end date, the end date should be null", () => {
    const event = EventFactory.USER_EVENT({
      date: {
        start: new Date("2025-01-01").toISOString(),
        end: new Date("2025-01-02").toISOString(),
      },
    });

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const { result } = renderHook(useEditDateModal, {
      initialProps: event.id,
      store,
    });

    expect(result.current.endDate).toBe(new Date("2025-01-02").toISOString());

    act(() => {
      result.current.toggleHasEndDate();
    });

    expect(result.current.endDate).toBe(null);
  });

  it("The end date should be before the start date", () => {
    const startDate = new Date("2025-01-05").toISOString();
    const endDate = new Date("2025-01-01").toISOString();

    const event = EventFactory.USER_EVENT({
      date: {
        start: startDate,
        end: startDate,
      },
    });

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const { result } = renderHook(useEditDateModal, {
      initialProps: event.id,
      store,
    });

    expect(result.current.endDateError).toBe(null);

    act(() => {
      result.current.setEndDate(endDate);
    });

    expect(result.current.endDateError).toBe(
      "End date must be after start date",
    );

    // Now I disable the end date so the error is not displayed anymore
    act(() => {
      result.current.toggleHasEndDate();
    });

    expect(result.current.endDateError).toBe(null);
    expect(result.current.endDate).toBe(null);
  });

  it("Should call the useCase when the button is pressed", async () => {
    const oldStartDate = new Date("2025-01-01").toISOString();
    const newStartDate = new Date("2025-01-02").toISOString();
    const newEndDate = new Date("2025-01-03").toISOString();

    const event = EventFactory.USER_EVENT({
      date: {
        start: oldStartDate,
        end: null,
      },
    });
    const SpyChangeDateOfEventUseCase = jest.spyOn(
      ChangeDateOfEventUseCase,
      "ChangeDateOfEvent",
    );

    const store = createTestStore({
      initialState: {
        events: produce(eventsInitialState, (draft) => {
          draft.ids.push(event.id);
          draft.entities[event.id] = event;
        }),
      },
    });

    const { result } = renderHook(useEditDateModal, {
      initialProps: event.id,
      store,
    });

    expect(result.current.isReady).toBe(true);

    act(() => {
      result.current.setStartDate(newStartDate);
      result.current.setEndDate(newEndDate);
    });

    await act(() => {
      result.current.changeEventDate();
    });

    expect(SpyChangeDateOfEventUseCase).toHaveBeenCalled();
    expect(SpyChangeDateOfEventUseCase).toHaveBeenCalledWith({
      eventId: event.id,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  });

  it("Should not call the useCase when the button is pressed if the start date is not set", async () => {
    const { result } = renderHook(useEditDateModal, {
      initialProps: "non-existing-event-id",
    });

    const SpyChangeDateOfEventUseCase = jest.spyOn(
      ChangeDateOfEventUseCase,
      "ChangeDateOfEvent",
    );

    act(() => {
      result.current.changeEventDate();
    });

    expect(SpyChangeDateOfEventUseCase).not.toHaveBeenCalled();
  });
});

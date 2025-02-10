import { renderHook } from "@app/react/renderHook";
import { useAddGuestsToEventModal } from "./AddGuestsToEventModal.controller";
import { createTestStore } from "@store/test-environment";
import { GuestFactory } from "@events/core/models/Guest.factory";
import {
  creationActions,
  initialCreationState,
} from "@events/core/slices/creation.slice";
import { produce } from "immer";
import { act, waitFor } from "@testing-library/react-native";
import * as goBackToPreviousStepUsecase from "@events/core/usecases/goBackToPreviousStep";

describe("AddGuestsToEventModal", () => {
  it("Should return an empty list as guests invited", () => {
    const store = createTestStore();
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guests).toStrictEqual([]);
  });

  it("Should return a list with 2 guests invited", () => {
    const guests = [
      GuestFactory.GUEST({ id: "1" }),
      GuestFactory.GUEST({ id: "2" }),
    ];

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.guests = guests;
        }),
      },
    });
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guests).toStrictEqual(guests);
  });

  it("Should remove a guest from the list of guests invited", () => {
    const guests = [
      GuestFactory.GUEST({ id: "1" }),
      GuestFactory.GUEST({ id: "2" }),
    ];

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.guests = guests;
        }),
      },
    });
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guests).toStrictEqual(guests);

    act(() => {
      result.current.removeGuest("1");
    });

    expect(result.current.guests).toStrictEqual([guests[1]]);
  });

  it("Should show empty list as guests proposition", () => {
    const store = createTestStore();
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guestsProposition).toStrictEqual([]);
  });

  it("Should show a list with 2 guests proposition", () => {
    const guestsProposition = [
      GuestFactory.GUEST({ id: "1" }),
      GuestFactory.GUEST({ id: "2" }),
    ];

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.searchGuests.guests = guestsProposition;
        }),
      },
    });

    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guestsProposition).toStrictEqual(guestsProposition);
  });

  it("Search field should be empty", () => {
    const store = createTestStore();
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.searchField).toStrictEqual("");
  });

  it("Search field should be equal to 'John'", () => {
    const searchField = "John";

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.searchGuests.field = searchField;
        }),
      },
    });

    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.searchField).toStrictEqual(searchField);
  });

  it("Search field should changed'", () => {
    const store = createTestStore();
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.searchField).toStrictEqual("");

    act(() => {
      result.current.setSearchField("John");
    });

    waitFor(() => {
      expect(result.current.searchField).toStrictEqual("John");
    });
  });

  it("Should add a guest to the list of guests invited", () => {
    const guestsProposition = [
      GuestFactory.GUEST({ id: "1" }),
      GuestFactory.GUEST({ id: "2" }),
    ];

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.searchGuests.guests = guestsProposition;
        }),
      },
    });

    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.guests).toStrictEqual([]);

    act(() => {
      result.current.addGuest(guestsProposition[0]!);
    });

    expect(result.current.guests).toStrictEqual([guestsProposition[0]]);
  });

  it("Should check if a guest is invited", () => {
    const guests = [
      GuestFactory.GUEST({ id: "1" }),
      GuestFactory.GUEST({ id: "2" }),
    ];

    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.guests = guests;
        }),
      },
    });

    const { result } = renderHook(useAddGuestsToEventModal, { store });

    expect(result.current.isInvited("1")).toBeTruthy();
    expect(result.current.isInvited("3")).toBeFalsy();
  });

  it("Should validate the guests step", () => {
    const spyAction = jest.spyOn(creationActions, "validateGuestsStep");

    const store = createTestStore();
    const { result } = renderHook(useAddGuestsToEventModal, { store });

    act(() => {
      result.current.validateGuestsStep();
    });

    expect(spyAction).toHaveBeenCalled();
  });

  it("should go back to the previous step", async () => {
    const spyGoBackToPreviousStep = jest.spyOn(
      goBackToPreviousStepUsecase,
      "goBackToPreviousStep",
    );

    const { result } = renderHook(useAddGuestsToEventModal);

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(spyGoBackToPreviousStep).toHaveBeenCalled();
  });
});

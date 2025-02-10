import { renderHook } from "@app/react/renderHook";
import { useEventAdditionalInfosModal } from "./EventAdditionalInfosModal.controller";
import { act } from "@testing-library/react-native";
import { StubRouter } from "@app/router/StubRouter";
import { produce } from "immer";
import { createTestStore } from "@store/test-environment";
import { initialCreationState } from "@events/core/slices/creation.slice";
import * as Usecase from "@events/core/usecases/additionalsInfos";
import * as goBackToPreviousStepUsecase from "@events/core/usecases/goBackToPreviousStep";

describe("EventAdditionalInfosModal", () => {
  it("Should return empty state from controller", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    expect(result.current.name).toBe("");
    expect(result.current.address).toBe("");
    expect(result.current.hasEndDate).toBe(false);
  });

  it("Should edit form values", () => {
    const { result } = renderHook(useEventAdditionalInfosModal);

    act(() => {
      result.current.setName("Location");
      result.current.setAddress("Address");
    });

    expect(result.current.name).toBe("Location");
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

  it("Should validate informations before saving", () => {
    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.location.name = null;
          draft.form.location.address = null;
          draft.form.date.start = null;
          draft.form.date.end = null;
        }),
      },
    });

    const spyUsecase = jest.spyOn(Usecase, "addAdditionalsInfos");

    const { result } = renderHook(useEventAdditionalInfosModal, { store });

    act(() => {
      result.current.setAdditionalsInfos();
    });

    expect(result.current.errorMessage).toStrictEqual({
      date: {
        start: "La date de début est requise",
        end: null,
      },
      location: {
        address: "L'adresse doit contenir au moins 5 caractères",
        name: "Le nom du lieu doit contenir au moins 2 caractères",
      },
    });

    act(() => {
      result.current.setName("Location");
      result.current.setAddress("Address");
      result.current.toggleHasEndDate();
      result.current.setStartDate("2022-01-02T00:00:00Z");
      result.current.setEndDate("2022-01-01T00:00:00Z");
    });

    act(() => {
      result.current.setAdditionalsInfos();
    });

    expect(spyUsecase).not.toHaveBeenCalled();

    expect(result.current.errorMessage).toStrictEqual({
      date: {
        start: null,
        end: "La date de fin doit être après la date de début",
      },
      location: {
        address: null,
        name: null,
      },
    });

    act(() => {
      result.current.setStartDate("2022-01-01T00:00:00Z");
      result.current.setEndDate("2022-01-02T00:00:00Z");
    });

    act(() => {
      result.current.setAdditionalsInfos();
    });

    expect(result.current.errorMessage).toStrictEqual({
      date: {
        start: "",
        end: "",
      },
      location: {
        address: "",
        name: "",
      },
    });

    expect(spyUsecase).toHaveBeenCalledWith({
      location: {
        name: "Location",
        address: "Address",
      },
      date: {
        start: "2022-01-01T00:00:00Z",
        end: "2022-01-02T00:00:00Z",
      },
    });
  });

  it("Should keep the state in memory", () => {
    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.location.name = "Location";
          draft.form.location.address = "Address";
          draft.form.date.start = "2022-01-01T00:00:00Z";
          draft.form.date.end = "2022-01-02T00:00:00Z";
        }),
      },
    });

    const { result } = renderHook(useEventAdditionalInfosModal, { store });

    expect(result.current.name).toBe("Location");
    expect(result.current.address).toBe("Address");
    expect(result.current.startDate).toBe("2022-01-01T00:00:00Z");
    expect(result.current.endDate).toBe("2022-01-02T00:00:00Z");
  });

  it("should go back to the previous step", async () => {
    const spyGoBackToPreviousStep = jest.spyOn(
      goBackToPreviousStepUsecase,
      "goBackToPreviousStep",
    );

    const { result } = renderHook(useEventAdditionalInfosModal);

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(spyGoBackToPreviousStep).toHaveBeenCalled();
  });
});

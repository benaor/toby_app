import { act } from "@testing-library/react-native";
import { useEventInformationsModal } from "./EventInformationsModal.controller";
import { renderHook } from "@app/react/renderHook";
import { initialCreationState } from "@events/core/slices/creation.slice";
import { produce } from "immer";
import { createTestStore } from "@store/test-environment";
import * as Usecase from "@events/core/usecases/addGeneralsInfos";
import * as goBackToPreviousStepUsecase from "@events/core/usecases/goBackToPreviousStep";

describe("EventInformationsModal", () => {
  it("Should validate informations before saving", async () => {
    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.title = null;
          draft.form.description = null;
          draft.form.image = null;
        }),
      },
    });

    const spyUsecase = jest.spyOn(Usecase, "addGeneralsInformations");

    const { result } = renderHook(useEventInformationsModal, { store });

    expect(result.current.title).toStrictEqual("");
    expect(result.current.description).toStrictEqual("");
    expect(result.current.image).toStrictEqual(null);

    act(() => {
      result.current.submitGeneralInformations();
    });

    expect(result.current.errorMessage).toStrictEqual({
      title: "Le titre est trop court",
      description: "La description est trop courte",
      image: "Veuillez ajouter une image",
    });

    act(() => {
      result.current.setTitle("Title");
      result.current.setDescription("Description");
      result.current.setImage("Image");
    });

    expect(result.current.title).toStrictEqual("Title");
    expect(result.current.description).toStrictEqual("Description");
    expect(result.current.image).toStrictEqual("Image");

    act(() => {
      result.current.submitGeneralInformations();
    });

    expect(result.current.errorMessage).toStrictEqual({
      title: "",
      description: "",
      image: "",
    });

    expect(spyUsecase).toHaveBeenCalledWith({
      title: "Title",
      description: "Description",
      image: "Image",
    });
  });
  it("Should keep the state in memory", async () => {
    const store = createTestStore({
      initialState: {
        creation: produce(initialCreationState, (draft) => {
          draft.form.title = "Title";
          draft.form.description = "Description";
          draft.form.image = "myImage";
        }),
      },
    });

    const spyUsecase = jest.spyOn(Usecase, "addGeneralsInformations");

    const { result } = renderHook(useEventInformationsModal, { store });

    expect(result.current.title).toStrictEqual("Title");
    expect(result.current.description).toStrictEqual("Description");
    expect(result.current.image).toStrictEqual("myImage");

    act(() => {
      result.current.submitGeneralInformations();
    });

    expect(result.current.errorMessage).toStrictEqual({
      title: "",
      description: "",
      image: "",
    });

    expect(spyUsecase).toHaveBeenCalledTimes(1);
    expect(spyUsecase).toHaveBeenCalledWith({
      title: "Title",
      description: "Description",
      image: "myImage",
    });
  });

  it("should go back to the previous step", async () => {
    const spyGoBackToPreviousStep = jest.spyOn(
      goBackToPreviousStepUsecase,
      "goBackToPreviousStep",
    );

    const { result } = renderHook(useEventInformationsModal);

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(spyGoBackToPreviousStep).toHaveBeenCalled();
  });
});

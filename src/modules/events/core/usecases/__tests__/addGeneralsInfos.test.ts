import {
  CreationStep,
  EventFormGeneralsInfos,
} from "@events/core/models/EventForm.model";
import { createTestStore } from "@store/test-environment";
import { addGeneralsInformations } from "../addGeneralsInfos";

describe("addInformationsOfEvent", () => {
  it("Should see null for every general information in form", () => {
    // Arrange
    const store = createTestStore();

    // Act
    const form = store.getState().creation.form;

    // Assert
    expect(form.title).toBeNull();
    expect(form.description).toBeNull();
    expect(form.image).toBeNull();
  });

  it("Should see the generals infos of the event", () => {
    // Arrange
    const store = createTestStore();

    // Act
    store.dispatch(addGeneralsInformations(generalsInfos));

    const form = store.getState().creation.form;

    // Assert
    expect(form.title).toBe(generalsInfos.title);
    expect(form.description).toBe(generalsInfos.description);
    expect(form.image).toBe(generalsInfos.image);
  });

  it("After adding generals infos, step should be EventAdditionalInfos", () => {
    // Arrange
    const store = createTestStore();

    // Act
    store.dispatch(addGeneralsInformations(generalsInfos));

    const step = store.getState().creation.step;

    // Assert
    expect(step).toBe(CreationStep.EventAdditionalInfos);
  });
});

const generalsInfos: EventFormGeneralsInfos = {
  title: "Birthday",
  description: "Birthday of my son",
  image: "https://fakeimage.test/image.jpg",
};

import { createTestStore } from "@store/test-environment";
import { addAdditionalsInfos } from "../additionalsInfos";
import {
  CreationStep,
  EventFormAdditionalsInfos,
} from "@events/core/models/EventForm.model";

describe("Add additionals infos while creation", () => {
  it("Should see null for every additional information in form", () => {
    // Arrange
    const store = createTestStore();

    // Assert
    const location = store.getState().creation.form.location;
    const date = store.getState().creation.form.date;

    expect(location).toBeNull();
    expect(date).toBeNull();
  });

  it("Should see null for every additional information in form", () => {
    // Arrange
    const store = createTestStore();

    // Act
    store.dispatch(addAdditionalsInfos(additionalInfos));

    // Assert
    const eventLocation = store.getState().creation.form.location;
    const eventDate = store.getState().creation.form.date;

    expect(eventLocation).toBe(location);
    expect(eventDate).toBe(date);
  });

  it("Should go to the next step (Add guests)", () => {
    // Arrange
    const store = createTestStore();

    // Act
    store.dispatch(addAdditionalsInfos(additionalInfos));

    // Assert
    const step = store.getState().creation.step;

    expect(step).toBe(CreationStep.AddGuestsToEvent);
  });
});

const location = {
  name: "My house",
  address: "My address",
};

const date = {
  start: new Date("2022-01-01T00:00:00Z").toISOString(),
  end: new Date("2022-01-02T00:00:00Z").toISOString(),
};

const additionalInfos: EventFormAdditionalsInfos = {
  location,
  date,
};

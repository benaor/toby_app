import { createTestStore } from "@store/test-environment";
import { addAdditionalsInfos } from "../additionalsInfos";
import { EventFormAdditionalsInfos } from "@events/core/models/EventForm.model";

describe("Add additionals infos while creation", () => {
  it("Should see null for every additional information in form", () => {
    // Arrange
    const store = createTestStore();

    // Assert
    const location = store.getState().creation.form.location;
    expect(location).toBeNull();
  });

  it("Should see null for every additional information in form", () => {
    // Arrange
    const store = createTestStore();

    const location = {
      name: "My house",
      address: "My address",
    };

    const additionalInfos: EventFormAdditionalsInfos = {
      location,
    };

    // Act
    store.dispatch(addAdditionalsInfos(additionalInfos));

    // Assert
    const eventLocation = store.getState().creation.form.location;
    expect(eventLocation).toBe(location);
  });
});

import { EventFormModules } from "@events/core/models/EventForm.model";
import { creationActions } from "@events/core/slices/creation.slice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { createTestStore } from "@store/test-environment";

describe("Choose Modules", () => {
  it("Every modules should be disable", () => {
    const store = createTestStore();

    const { location, cagnotte, budget, activity } =
      store.getState().creation.form.modules;

    expect(location).toBe(false);
    expect(cagnotte).toBe(false);
    expect(budget).toBe(false);
    expect(activity).toBe(false);
  });

  it.each<{
    moduleName: keyof EventFormModules["modules"];
    action: ActionCreatorWithoutPayload;
  }>([
    { moduleName: "location", action: creationActions.toggleLocationModule },
    { moduleName: "cagnotte", action: creationActions.toggleCagnotteModule },
    { moduleName: "budget", action: creationActions.toggleBudgetModule },
    { moduleName: "activity", action: creationActions.toggleActivityModule },
  ])("Should enable %moduleName module", ({ moduleName, action }) => {
    // Arrange
    const store = createTestStore();
    store.dispatch(action());

    let module = store.getState().creation.form.modules[moduleName];
    expect(module).toBe(true);

    // Act
    store.dispatch(action());

    // Assert
    module = store.getState().creation.form.modules[moduleName];
    expect(module).toBe(false);
  });
});

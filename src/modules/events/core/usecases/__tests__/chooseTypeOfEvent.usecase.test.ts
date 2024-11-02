import { createTestStore } from "@store/test-environment";
import { chooseTypeOfEvent } from "../chooseTypeOfEvent.usecase";
import { CreationStep, EventType } from "@events/core/models/EventForm.model";

describe("chooseTypeOfEvent", () => {
  it("Step should be ChooseEvent when start the workflow", () => {
    const store = createTestStore();

    const typeOfEvent = store.getState().creation.step;

    expect(typeOfEvent).toEqual(CreationStep.ChooseEvent);
  });

  it("Typeof event should be null when no type of event hasn't been choosen yet", () => {
    const store = createTestStore();

    const typeOfEvent = store.getState().creation.form.type;

    expect(typeOfEvent).toBeNull();
  });

  it("Typeof event should be birthday when its choosen", () => {
    const typeofEvent: EventType = "birthday";
    const store = createTestStore();

    store.dispatch(chooseTypeOfEvent(typeofEvent));
    const typeOfEvent = store.getState().creation.form.type;

    expect(typeOfEvent).toBe(typeOfEvent);
  });

  it("When any type of event is choosen, step pass to EventInformations", () => {
    const typeofEvent: EventType = "birthday";
    const store = createTestStore();

    store.dispatch(chooseTypeOfEvent(typeofEvent));
    const step = store.getState().creation.step;

    expect(step).toBe(CreationStep.EventInformations);
  });
});

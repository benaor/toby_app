import { AppState } from "@store/store";

export const creationStepSelector = (state: AppState) => state.creation.step;
export const creationFormSelector = (state: AppState) => state.creation.form;

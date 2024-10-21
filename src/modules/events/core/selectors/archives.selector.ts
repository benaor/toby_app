import { AppState } from "@store/store";
import { archivesSelectors } from "../slices/archives.slices";

export const archivesEntitiesSelector = (state: AppState) =>
  archivesSelectors.selectAll(state.archives);

export const archivesStatusSelector = (state: AppState) =>
  state.archives.status;

export const archivesErrorSelector = (state: AppState) => state.archives.error;

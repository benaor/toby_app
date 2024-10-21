import { AppState } from "@store/store";
import { archivesSelectors } from "../slices/archives.slices";

export const allArchivesSelector = (state: AppState) =>
  archivesSelectors.selectAll(state.archives);

export const archivesStateSelector = (state: AppState) => state.archives;

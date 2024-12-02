import { creationActions } from "../slices/creation.slice";

export const searchGuests = (field: string) =>
  creationActions.setSearchField(field);

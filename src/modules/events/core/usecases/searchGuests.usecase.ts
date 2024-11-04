import { createAppAsyncThunk } from "@store/thunk";
import { creationActions } from "../slices/creation.slice";

export const searchGuests = (field: string) =>
  creationActions.setSearchField(field);

export const fetchSearchedGuests = createAppAsyncThunk(
  "searchGuest/fetch",
  async (field: string, { extra }) =>
    await extra.guestsRepository.searchMany(field),
);

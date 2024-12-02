import { createAppAsyncThunk } from "@store/thunk";

export const fetchSearchedGuests = createAppAsyncThunk(
  "searchGuest/fetch",
  async (field: string, { extra }) =>
    await extra.guestsRepository.searchMany(field),
);

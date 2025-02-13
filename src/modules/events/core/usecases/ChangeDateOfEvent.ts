import { createAppAsyncThunk } from "@store/thunk";

type UseCaseParams = {
  eventId: Identifier;
  startDate: ISO8601;
  endDate: ISO8601 | null;
};

export const ChangeDateOfEvent = createAppAsyncThunk(
  "events/changeDateOfEvent",
  async ({ eventId, startDate, endDate }: UseCaseParams, { extra }) => {
    await extra.eventRepository.changeDateOfEvent(eventId, {
      start: startDate,
      end: endDate,
    });

    return { eventId, dates: { start: startDate, end: endDate } };
  },
);

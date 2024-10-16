import { Dependencies } from "@app/dependencies/Dependencies.type";
import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  GetThunkAPI,
} from "@reduxjs/toolkit";

export const createAppAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    GetThunkAPI<{ extra: Dependencies }>
  >,
  options?: AsyncThunkOptions<ThunkArg, GetThunkAPI<{ extra: Dependencies }>>,
): AsyncThunk<Returned, ThunkArg, GetThunkAPI<{ extra: Dependencies }>> => {
  return createAsyncThunk(typePrefix, payloadCreator, options);
};
